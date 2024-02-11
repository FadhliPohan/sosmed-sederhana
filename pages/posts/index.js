import Listkomentar from "@/components/molekul/listkomentar";
import { useLike } from "@/hooks/useLike";
import { useMutation } from "@/hooks/useMutation";
import { useQueries } from "@/hooks/useQueries";
import Layout from "@/layout";
import { Avatar, Stack, useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useState } from "react";

export default function Post() {
  const toast = useToast();
  const { mutate } = useMutation();
  const [komentar, setKomentar] = useState(false);
  const [id, setId] = useState("");
  const { like, unlike } = useLike();
  const [listKomen, setListKomen] = useState({});
  const [openCerita, setOpenCerita] = useState(false);
  const [payload, setPayload] = useState({
    description: "",
  });
  const { data, isLoading, isError, refetchData } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });
  const slice = (desc) => {
    const words = desc.split(" ");
    const final = words.slice(0, 2).join(" ");
    return final;
  };

  const OpenCerita = () => {
    setOpenCerita(true);
  };
  const CloseCerita = () => {
    setOpenCerita(false);
  };

  const kirimCerita = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/post",
      payload: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      toast({
        title: "Cerita Gagal Dibuat!",
        description: "Cerita yang anda buat gagal diunggah",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      refetchData();
      setPayload({
        description: "",
      });
      toast({
        title: "Cerita Berhasil Dibuat!",
        description: "Cerita yang anda buat berhasil diunggah",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const sukaiPost = async (idPost) => {
    const response = await like({
      idPost: idPost,
    });
    if (!response?.success) {
      toast({
        title: "Cerita Gagal disukai!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      refetchData();
      setPayload({
        description: "",
      });
      toast({
        title: "Cerita Berhasil disukai!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  const unlikepost = async (idPost) => {
    const response = await unlike({
      idPost: idPost,
    });
    if (!response?.success) {
      toast({
        title: "Cerita Gagal Dilike!",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      refetchData();
      setPayload({
        description: "",
      });
      toast({
        title: "Cerita Berhasil Diunlike!",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const lihatKomentar = async (idPost) => {
    setKomentar(true);
    setId(idPost);
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/replies/post/" + idPost,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("user_token")}`,
          },
        }
      );
      const list = await response.json();
      setListKomen(list);
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setKomentar(false);
    setId("");
  };
  return (
    <div>
      <Layout>
        <br />
        <main id="main">
          <section id="pricing" class="pricing section-bg">
            <div class="container">
              <div class="section-title">
                <h2>Postingan Guys</h2>
                <p>
                  kuy buat postingan baru biar hidupmu lebih berisi dan
                  diperhatikan, tenang kamu ngak sendiri kok :){" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => OpenCerita()}
                  >
                    Buat cerita
                  </button>
                </p>
              </div>

              <Listkomentar
                isOpen={komentar}
                onClose={closeModal}
                // onFetch={lihatKomentar(id)}
                name="Komentar Netizen"
                size="lg"
                data={listKomen ? listKomen : null}
                id={id ? id : null}
              />

              {openCerita ? (
                <div class="col-lg-12 mt-4 mt-md-0 mb-3">
                  <div className="card ">
                    <div className="card-card-header mt-4">
                      <h3
                        className="h3 fw-semibold text-center"
                        style={{ color: "GrayText" }}
                      >
                        Tulis apa saja :)
                      </h3>
                    </div>
                    <div className="card-body">
                      <form role="form" class="php-email-form">
                        <div class="form-group mt-3">
                          {/* <input
                        hidden
                        value={payload?.id}
                        onChange={(event) => {
                          setPayload({
                            ...payload,
                            id: event.target.value,
                          });
                        }}
                      /> */}
                          <textarea
                            class="form-control"
                            name="description"
                            rows="5"
                            value={payload?.description}
                            onChange={(event) => {
                              setPayload({
                                ...payload,
                                description: event.target.value,
                              });
                            }}
                            placeholder="Apa yang sedang kamu pikirkan?"
                            required
                          ></textarea>
                        </div>

                        <div class="text-center m-3">
                          <button
                            type="submit"
                            className="btn btn-danger "
                            style={{ marginRight: "10px" }}
                            onClick={() => CloseCerita()}
                          >
                            Batal
                          </button>
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => kirimCerita()}
                          >
                            Kirim
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {data?.data?.map((item) => (
                <div class="row">
                  <div className="col-lg-12 col-md-12">
                    <div className="card border-success mb-3">
                      <div className="card-header bg-success-subtle">
                        <div className="row p-2">
                          <div className="col-md-1 text-center justify-content-center d-flex align-items-center">
                            <Stack direction="row">
                              <Avatar
                                name={item.user.name}
                                src="https://bit.ly/broken-link"
                              />
                            </Stack>
                          </div>
                          <div className="col-md-11">
                            <div className="row align-items-center d-flex justify-content-start">
                              <div className="col-auto">
                                <h5 className="lead m-0">{item.user.name}</h5>
                                <p className="m-0">{item.user.email}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card-body text-success">
                        <h5 className="card-title">
                          {slice(item.description)}
                        </h5>
                        <p className="card-text">{item.description}</p>
                      </div>
                      <div className="card-footer ">
                        <div className="d-flex justify-content-center">
                          <button
                            type="button"
                            className="btn btn-love"
                            onClick={
                              item.is_like_post
                                ? () => unlikepost(item.id)
                                : () => sukaiPost(item.id)
                            }
                            style={{ marginRight: "10px" }}
                          >
                            <span className="badge badge-danger bg-danger">
                              {item.likes_count}
                            </span>{" "}
                            &nbsp; {item.is_like_post ? "Menyukai" : "suka"}
                          </button>

                          <button
                            type="button"
                            className="btn btn-komen"
                            onClick={() => lihatKomentar(item.id)}
                          >
                            <span className="badge badge-primary bg-primary">
                              {item.replies_count}
                            </span>{" "}
                            &nbsp; Komentar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </Layout>
    </div>
  );
}

import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
export default function Listkomentar(props) {
  const toast = useToast();
  const [payload, setPayload] = useState({
    description: "",
  });
  const { mutate } = useMutation();
  const [dataList, setDataList] = useState("");

  const kirimKomentar = async () => {
    const response = await mutate({
      url:
        "https://paace-f178cafcae7b.nevacloud.io/api/replies/post/" + props.id,
      payload: payload,
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      toast({
        title: "Komentar Gagal Dibuat!",
        description: "Komentar yang anda buat gagal diunggah",
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
        title: "Komentar Berhasil Dibuat!",
        description: "Komentar yang anda buat berhasil diunggah",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const refetchData = async () => {
    const response = await fetch(
      "https://paace-f178cafcae7b.nevacloud.io/api/replies/post/" + props.id,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      }
    );
    const list = await response.json();
    setDataList(list);
  };

  const hapusKomentar = async (idKomentar) => {
    const response = await mutate({
      url:
        "https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/" +
        idKomentar,
      payload: payload,
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });
    if (!response?.success) {
      toast({
        title: "Komentar Gagal Dihapus!",
        description: "Komentar yang anda hapus gagal diunggah",
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
        title: "Komentar Berhasil Dihapus!",
        description: "Komentar yang anda hapus berhasil diunggah",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    refetchData();
  }, [props.id]);

  const formatDate = (tgl) => {
    var mydate = new Date(tgl);
    var str = mydate.toLocaleDateString();
    return str;
  };

  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.onClose}>
          <div className="modal-dialog modal-xl">
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="card">
                <div className="card-header d-flex">
                  <h5 className="mt-4 lead fw-semibold">{props.name}</h5>
                  <button
                    className="btn btn-sm ms-auto"
                    onClick={props.onClose}
                  >
                    X
                  </button>
                </div>
                <div
                  className="card-body"
                  style={{ minWidth: "400px", width: "100%" }}
                >
                  <div
                    className="list-group"
                    style={{ maxHeight: "300px", overflowY: "auto" }}
                  >
                    {/* start coment */}
                    {dataList?.data?.map((item) => (
                      <>
                        <a className="list-group-item list-group-item-action flex-column align-items-start">
                          <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-2 fw-bold">
                              {item.user.name}{" "}
                              {item.is_own_reply && (
                                <button
                                  className="btn btn-danger"
                                  onClick={() => hapusKomentar(item.id)}
                                >
                                  hapus
                                </button>
                              )}
                            </h5>
                            <small>{formatDate(item.created_at)}</small>
                          </div>
                          <p className="mb-1">{item.description}</p>
                        </a>
                        <p></p>
                      </>
                    ))}
                    {/* end Comment */}
                  </div>
                  <form role="form" className="php-email-form">
                    <div className="form-group mt-3">
                      <textarea
                        className="form-control"
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

                    <div className="text-center m-3">
                      <button
                        type="button"
                        className="btn btn-danger "
                        style={{ marginRight: "10px" }}
                        onClick={props.onClose}
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => kirimKomentar()}
                      >
                        Balas
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

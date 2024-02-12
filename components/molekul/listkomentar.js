import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";

export default function Listkomentar(props) {
  const {
    id, onClose, name, isOpen,
  } = props;
  const toast = useToast();
  const [payload, setPayload] = useState({
    description: "",
  });
  const { mutate } = useMutation();
  const [dataList, setDataList] = useState("");

  const refetchData = async () => {
    const response = await fetch(
      `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      },
    );
    const list = await response.json();
    setDataList(list);
  };

  const kirimKomentar = async () => {
    // const { id } = props;
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
      payload,
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

  const hapusKomentar = async (idKomentar) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${idKomentar}`,
      payload,
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
  }, [id]);

  const formatDate = (tgl) => {
    const mydate = new Date(tgl);
    const str = mydate.toLocaleDateString();
    return str;
  };

  return (
    <div>
      {isOpen && (
        <div
          className="modal-overlay"
          // onClick={onClose}
          // onKeyDown={(e) => e.key === "Enter" && onClose()}
          role="button"
          tabIndex="0"
          aria-label="Close Modal"
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="card">
                <div className="card-header d-flex">
                  <h5 className="mt-4 lead fw-semibold">{name}</h5>
                  <button
                    type="button"
                    className="btn btn-sm ms-auto"
                    onClick={onClose}
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
                    {/* start comment */}
                    {dataList?.data?.map((item) => (
                      <div
                        key={item.id}
                        className="list-group-item list-group-item-action flex-column align-items-start"
                      >
                        <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-2 fw-bold">
                            {item.user.name}
                            {" "}
                            {item.is_own_reply && (
                              <button
                                type="button"
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
                      </div>
                    ))}
                    {/* end comment */}
                  </div>
                  <form className="php-email-form">
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
                      />
                    </div>

                    <div className="text-center m-3">
                      <button
                        type="button"
                        className="btn btn-danger "
                        style={{ marginRight: "10px" }}
                        onClick={onClose}
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
    </div>
  );
}

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import {
  GridItem,
  Text,
  Button,
  useDisclosure,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Layout from "@/layout";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";

export default function DetailPost() {
  const { mutate } = useMutation();

  const [textInput, setTextnput] = useState({
    id: "",
    description: "",
  });
  const [Detailme, setDetailMe] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDelete, setIsDelete] = useState(false);
  const onOpenDelete = () => {
    setIsDelete(true);
  };
  const onCloseDelete = () => {
    setIsDelete(false);
  };
  const {
    data, isLoading, isError, refetchData,
  } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=me",
    headers: {
      Authorization: `Bearer ${Cookies.get("user_token")}`,
    },
  });

  const HandleSubmit = async (idPost) => {
    try {
      const response = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${idPost}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
        payload: textInput,
      });

      if (response?.success) {
        refetchData();
        onClose();
      }
    } catch (error) {}
  };

  const ViewData = async (idPost) => {
    // onOpen();
    try {
      const response = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/${idPost}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });

      onOpen();
      if (response?.success) {
        setTextnput({
          id: response?.data?.id,
          description: response?.data?.description,
        });
      }
    } catch (error) {}
  };

  const HandleDelete = async (id) => {
    onOpenDelete();

    try {
      const response = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });

      if (response?.success) {
        onOpenDelete();
        setTextnput(response?.data);
      }
    } catch (error) {}
  };

  const DeleteData = async (id) => {
    try {
      const response = await mutate({
        url: `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${Cookies.get("user_token")}`,
        },
      });

      if (response?.success) {
        refetchData();
        onCloseDelete();
      }
    } catch (error) {}
  };

  const me = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    setDetailMe(response);
  };
  const formatDate = (tgl) => {
    const mydate = new Date(tgl);
    const str = mydate.toString();
    return str;
  };

  useEffect(() => {
    me();
  }, []);
  return (
    <div>
      <Layout>
        <br />
        <section id="services" className="pricing mt-5">
          <div className="container">
            <div className="section-title">
              <h2>
                Halo
                {Detailme?.data?.email}
              </h2>
              <p>
                {Detailme?.data?.email}
                {" "}
                Kamu telah terdaftar pada pada
                {" "}
                {formatDate(Detailme?.data?.created_at)}
                {" "}
                dan pernah di update
                pada
                {formatDate(Detailme?.data?.updated_at)}
                {" "}
                dengan ini kami
                mengucapkan terima kasih atas partisipasinya pada aplikasi kami,
                semoga kedepannya menjadi lebih baik :)
              </p>
            </div>

            <div className="row" />
          </div>
        </section>
        <section id="services" className="services">
          <div className="container">
            <div className="section-title">
              <h2>Postingan kamu</h2>
              <p>
                Brikut ini daftar postingan kamu, pemilu besok jangan lupa
                nyoblos ya ..., ingat untuk indonesia yang lebih adil dan
                makmur, maju, dan sat set
              </p>
            </div>

            <div className="row">
              {data?.data?.map((item) => (
                <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0 mt-5">
                  <div className="icon-box">
                    <div className="icon">
                      <button
                        type="button"
                        aria-label="Hapus"
                        onClick={() => HandleDelete(item.id)}
                      >
                        <i className="bi bi-trash m-2" />
                      </button>
                      <button aria-label="Lihat" type="button" onClick={() => ViewData(item.id)}>
                        <i className="bi bi-pencil-square m-2" />
                      </button>
                    </div>
                    <h4 className="title mt-2">
                      <p href="">{item.user.email}</p>
                    </h4>
                    <p className="description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit status, bisa kok...</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GridItem>
              <Textarea
                value={textInput?.description || ""}
                onChange={(event) => setTextnput({
                  ...textInput,
                  description: event.target.value,
                })}
              />
            </GridItem>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                HandleSubmit(textInput?.id || "");
              }}
            >
              Simpan
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* modal close */}
      <Modal isOpen={isDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Hapus Data?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Apakah Anda yakin untuk menghapus data
              {textInput?.description || ""}
              {" "}
              ?
            </p>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              variant="ghost"
              mr={3}
              onClick={onCloseDelete}
            >
              Batal
            </Button>
            <Button
              colorScheme="red"
              // variant="ghost"
              onClick={() => {
                DeleteData(textInput?.id || "");
              }}
            >
              Hapus
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

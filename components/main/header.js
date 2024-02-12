import {
  useToast,
  GridItem,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

import { useMutation } from "@/hooks/useMutation";
import { UserContect } from "@/context/userContact";

export default function Header() {
  const router = useRouter();
  const { mutate } = useMutation();
  const toast = useToast();
  const [dataList, setDataList] = useState();
  const [activeLink, setActiveLink] = useState("/");
  const [isLogin, setisLogin] = useState(false);
  const userData = useContext(UserContect);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const notif = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/notifications",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    setDataList(response);
    onOpen();
  };

  useEffect(() => {
    setActiveLink(router.asPath);
    if (userData) {
      setisLogin(true);
    }
  }, []);

  const HandleLogout = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers: {
        Authorization: `Bearer ${Cookies.get("user_token")}`,
      },
    });

    console.log(response);
    if (!response?.success) {
      toast({
        title: "Logout Gagal !",
        description: "",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      Cookies.remove("user_token");
      setisLogin(false);
      // router.push("/login");
    } else {
      Cookies.remove("user_token");
      // await router.push("/login");
      setisLogin(false);
      toast({
        title: "Sukses Logout !",
        description: "Username berhasil untuk Logout",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      window.location.reload();
    }
  };
  return (
    <>
      <div>
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="logo">
              <a href="index.html">Huhuii</a>
            </h1>
            <nav id="navbar" className="navbar">
              <ul>
                <li>
                  <Link
                    className={`nav-link scrollto active ${
                      activeLink === "/" ? "active" : ""
                    }`}
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`nav-link scrollto active ${
                      activeLink === "/aboutme" ? "active" : ""
                    }`}
                    href="/aboutme"
                  >
                    Tentang Pengembang
                  </Link>
                </li>
                {isLogin === true && (
                  <>
                    <li className="dropdown">
                      <p type="button">
                        <span>Pengaturan</span>
                        {" "}
                        <i className="bi bi-chevron-down" />
                      </p>
                      <ul>
                        <li>
                          <Link href={`/posts/${userData?.email}`}>
                            {userData?.name}
                          </Link>
                        </li>
                        <li>
                          <button type="button" onClick={() => notif()}>
                            Notifikasi
                          </button>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link className="btn-buy" href="/posts">
                        Lihat Postingan
                      </Link>
                    </li>
                  </>
                )}

                {isLogin === false ? (
                  <li>
                    <Link className="getstarted scrollto" href="/login">
                      Login
                    </Link>
                  </li>
                ) : (
                  <li>
                    <button
                      type="button"
                      className="getstarted scrollto"
                      onClick={() => HandleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                )}
              </ul>
              <i className="bi bi-list mobile-nav-toggle" />
            </nav>
          </div>
        </header>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Notif Kamu Hari Ini ges</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <GridItem>
              <div
                className="list-group"
                style={{ maxHeight: "300px", overflowY: "auto" }}
              >
                {/* start coment */}
                {dataList?.data?.map((item) => (
                  <div className="">
                    <button
                      type="button"
                      className={`list-group-item list-group-item-action flex-column align-items-start ${
                        item.read ? "" : "bg-info"
                      } `}
                    >
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-2 fw-bold">{item.user.name}</h5>
                        <small>{item.user.email}</small>
                      </div>
                      <p className="mb-1">
                        Bentuk :
                        {item.remark}
                      </p>
                      <p className="mb-1">
                        Postingan :
                        {" "}
                        {item.posts.description}
                      </p>
                    </button>
                    <p />
                  </div>
                ))}
                {/* end Comment */}
              </div>
            </GridItem>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

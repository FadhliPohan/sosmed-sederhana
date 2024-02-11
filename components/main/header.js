import { UserContect } from "@/context/userContact";
import { useMutation } from "@/hooks/useMutation";
import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const { mutate } = useMutation();
  const toast = useToast();
  const [activeLink, setActiveLink] = useState("/");
  const [isLogin, setisLogin] = useState(false);
  const userData = useContext(UserContect);

  useEffect(() => {
    setActiveLink(router.asPath);
    if (userData) {
      setisLogin(true);
    }
  }),
    [];

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
      await router.push("/login");
      setisLogin(false);
      toast({
        title: "Sukses Logout !",
        description: "Username berhasil untuk Logout",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    }
  };
  return (
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
                    activeLink == "/" ? "active" : ""
                  }`}
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link scrollto active ${
                    activeLink == "/aboutme" ? "active" : ""
                  }`}
                  href="/aboutme"
                >
                  Tentang Pengembang
                </Link>
              </li>
              {isLogin === false ? (
                <></>
              ) : (
                <>
                  <li class="dropdown">
                    <a href="#">
                      <span>Pengaturan</span> <i class="bi bi-chevron-down"></i>
                    </a>
                    <ul>
                      <li>
                        <a href="#">{userData?.name}</a>
                      </li>
                      <li>
                        <a href="#">Notifikasi</a>
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
                  <a
                    className="getstarted scrollto"
                    onClick={() => HandleLogout()}
                  >
                    Logout
                  </a>
                </li>
              )}
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </div>
  );
}

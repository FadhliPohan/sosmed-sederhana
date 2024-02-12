import { useToast } from "@chakra-ui/react";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "@/layout";
import { useMutation } from "@/hooks/useMutation";

export default function Login() {
  const router = useRouter();
  const toast = useToast();
  const { mutate } = useMutation();
  const [payload, setPayload] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleSubmit = async () => {
    console.log(payload);
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/register",
      payload,
    });
    if (!response?.success) {
      toast({
        title: "Login Gagal !",
        description: "Username atau Pasword yang anda masukkan salah",
        status: "error",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Register Berhasil !",
        description: "Username atau Pasword yang anda masukkan salah",
        status: "success",
        duration: 9000,
        isClosable: true,
        position: "top",
      });
      router.push("/login");
    }
  };

  return (
    <div>
      <Layout>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="/img/hero-img.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className=" text-center  ">
                    <h1 className="lead fw-bold">Login dulu gess!</h1>
                    <small className="">
                      Memasukkan username dan passwor yang telah terdaftar!
                    </small>
                  </div>
                  <div className="divider d-flex align-items-center my-4">
                    {/* <p className="text-center fw-bold mx-3 mb-0">Or</p> */}
                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-3">
                    <input
                      type="name"
                      id="name"
                      value={payload?.name}
                      onChange={(event) => {
                        setPayload({ ...payload, name: event.target.value });
                      }}
                      className="form-control form-control-lg"
                      placeholder="Masukkan nama lengkapmu"
                    />

                  </div>
                  {/* Email input */}
                  <div className="form-outline mb-3">
                    <input
                      type="email"
                      id="email"
                      value={payload?.email}
                      onChange={(event) => {
                        setPayload({ ...payload, email: event.target.value });
                      }}
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                    />

                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="password"
                      value={payload?.password}
                      onChange={(event) => {
                        setPayload({
                          ...payload,
                          password: event.target.value,
                        });
                      }}
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />

                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={() => HandleSubmit()}
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Tidak Memiliki Akun ?
                      <Link href="/register" className="link-danger">
                        Register
                      </Link>

                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
        <br />
      </Layout>
    </div>
  );
}

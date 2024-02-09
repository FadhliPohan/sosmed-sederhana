import Layout from "@/layout";
import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div>
      <Layout>
        <section className="vh-100">
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                  className="img-fluid"
                  alt="Sample image"
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
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className="form-control form-control-lg"
                      placeholder="Enter a valid email address"
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email address
                    </label>
                  </div>
                  {/* Password input */}
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                    >
                      Login
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?
                      <Link href="/register" className="link-danger">
                        Register
                      </Link>
                      {/* <Link href="#!" className="link-danger">
                            Register
                            </Link> */}
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

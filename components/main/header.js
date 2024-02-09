import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [activeLink, setActiveLink] = useState("/");

  useEffect(() => {
    setActiveLink(router.asPath);
  }),
    [router.asPath];
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
                  Tentang Saya
                </Link>
              </li>

              <li>
                <Link className="getstarted scrollto" href="/login">
                  Login
                </Link>
              </li>
            </ul>
            <i className="bi bi-list mobile-nav-toggle"></i>
          </nav>
        </div>
      </header>
    </div>
  );
}

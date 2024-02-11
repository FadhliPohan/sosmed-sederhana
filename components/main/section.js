import Link from "next/link";
import React from "react";

export default function Section() {
  return (
    <section id="hero" className="d-flex align-items-center">
      <div className="container d-flex flex-column align-items-center justify-content-center">
        <h1>Halo Semua mari kita bercerita</h1>
        <h2>
          Kami adalah aplikasi sosial media yang untuk menjangkau teman yang
          laebih banyak
        </h2>
        <Link href="/posts" className="btn-get-started scrollto">
          Mari mulai
        </Link>
        <img src="/img/hero-img.png" className="img-fluid hero-img" alt="" />
      </div>
    </section>
  );
}

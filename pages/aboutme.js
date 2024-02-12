import React from "react";
import Section from "@/components/main/section";
import Layout from "@/layout";

export default function About() {
  return (
    <Layout>
      <br />
      <main id="main">
        <section id="testimonials" className="testimonials section-bg">
          <div className="container">
            <div className="section-title">
              <h2>Tentang Saya</h2>
              <p>
                Saya bekerja dibidang Informasi teknologi, memiliki pengalaman
                kurang lebih 4 tahun. kesibukan sekarang bekerja untuk membuat
                website disalah satu perusahaan, saya memiliki hobi membaca,
                makan, dan traveling. udah gitu aja yah .... hehehe :)
              </p>
            </div>

            <div className="testimonials-slider swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      {`"Cintai ususmu minum yakult tiap hari, cintai nenekmu
                      cabut uban tiap hari, cintai harimu cari uang tiap hari,
                      cintai tuhanmu 5 waktu tiap hari"`}
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <div className="justify-content-center align-items-center d-flex">
                      <img
                        src="/fadli.jpg"
                        className="rounded-circle img-fluid text-center"
                        style={{ weight: "20px", height: "200px" }}
                        alt=""
                      />
                    </div>

                    <h3>Muhammad Fadhli Dzil Ikram Pohan</h3>
                    <h4 className="text-primary">
                      IQOF | Independent Quality Of Future
                    </h4>
                    <h4 className="mb-5">Ceo &amp; Founder</h4>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Export tempor illum tamen malis malis eram quae irure
                      esse labore quem cillum quid cillum eram malis quorum
                      velit fore eram velit sunt aliqua noster fugiat irure
                      amet legam anim culpa.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="/img/testimonials/testimonials-2.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Sara Wilsson</h3>
                    <h4>Designer</h4>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Enim nisi quem export duis labore cillum quae magna enim
                      sint quorum nulla quem veniam duis minim tempor labore
                      quem eram duis noster aute amet eram fore quis sint
                      minim.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="/img/testimonials/testimonials-3.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Jena Karlis</h3>
                    <h4>Store Owner</h4>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Fugiat enim eram quae cillum dolore dolor amet nulla
                      culpa multos export minim fugiat minim velit minim dolor
                      enim duis veniam ipsum anim magna sunt elit fore quem
                      dolore labore illum veniam.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="/img/testimonials/testimonials-4.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>Matt Brandon</h3>
                    <h4>Freelancer</h4>
                  </div>
                </div>

                <div className="swiper-slide">
                  <div className="testimonial-item">
                    <p>
                      <i className="bx bxs-quote-alt-left quote-icon-left" />
                      Quis quorum aliqua sint quem legam fore sunt eram irure
                      aliqua veniam tempor noster veniam enim culpa labore
                      duis sunt culpa nulla illum cillum fugiat legam esse
                      veniam culpa fore nisi cillum quid.
                      <i className="bx bxs-quote-alt-right quote-icon-right" />
                    </p>
                    <img
                      src="/img/testimonials/testimonials-5.jpg"
                      className="testimonial-img"
                      alt=""
                    />
                    <h3>John Larson</h3>
                    <h4>Entrepreneur</h4>
                  </div>
                </div>
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

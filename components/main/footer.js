import React from "react";

export default function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="container d-md-flex py-4">
          <div className="me-md-auto text-center text-md-start">
            <div className="copyright">
              © Copyright
              {" "}
              <strong>
                <span>Huhuii</span>
              </strong>
              . All Rights Reserved
            </div>
            <div className="credits">
              Designed by
              {" "}
              <a href="/">FadhliPohan</a>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

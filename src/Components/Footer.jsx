import React from "react";

function Footer() {
  return (
    <footer
      className="text-light pt-5 pb-4 mt-5"
      style={{
        background: "rgba(0,0,0,0.9)",
        borderTop: "1px solid rgba(0,255,255,0.2)",
      }}
    >
      <div className="container">

        <div className="row">

          {/* BRAND */}
          <div className="col-md-4 mb-4">
            <h4 style={{ color: "#00e5ff" }}>NextBotics</h4>
            <p style={{ color: "#bbb" }}>
              Smart Tech Marketplace for modern electronics. Buy, sell, and pay seamlessly with MPESA.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className="col-md-4 mb-4">
            <h5 style={{ color: "#00e5ff" }}>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-decoration-none text-light">Home</a></li>
              <li><a href="/addproducts" className="text-decoration-none text-light">Add Products</a></li>
              <li><a href="/signin" className="text-decoration-none text-light">Login</a></li>
              <li><a href="/signup" className="text-decoration-none text-light">Register</a></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="col-md-4 mb-4">
            <h5 style={{ color: "#00e5ff" }}>Contact</h5>
            <p className="mb-1">Email: masaitrevis@nextbotics.com</p>
            <p className="mb-1">Phone: +254 740 125 664</p>
            <p>Nairobi, Kenya</p>
          </div>

        </div>

        <hr style={{ borderColor: "rgba(0,255,255,0.2)" }} />

        {/* SOCIALS */}
        <div className="text-center mt-3">

          <h5 style={{ color: "#00e5ff" }}>Follow Us</h5>

          <div className="d-flex justify-content-center gap-4 mt-3">

            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <i className="bi bi-facebook"></i>
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <i className="bi bi-instagram"></i>
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <i className="bi bi-twitter-x"></i>
            </a>

            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <i className="bi bi-github"></i>
            </a>

            <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: "#fff", fontSize: "20px" }}>
              <i className="bi bi-linkedin"></i>
            </a>

          </div>

          <p className="mt-3" style={{ fontSize: "14px", color: "#888" }}>
            © {new Date().getFullYear()} NextBotics. Built by MARCITO 🚀
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css"; 

const About = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Main About Section */}
      <div className="container my-5 flex-grow-1">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold text-primary mb-4">About NoteNest</h1>
            <p className="lead">
              The aim of NoteNest is to provide users with a fast, clean, and secure way to take, manage, and organize their notes. Whether you're a student, professional, or creative mind, NoteNest helps keep your thoughts in one safe place – accessible anytime, anywhere.
            </p>
            <p>
             It simplifies your digital workspace with intuitive design and smart features.
             Collaboration-ready and cloud-friendly, it adapts to your daily workflow.
             With NoteNest, productivity meets simplicity—right at your fingertips.              
            </p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="https://tse4.mm.bing.net/th/id/OIP.itcAYMWAa1p9pm3xzhcMsQHaEK?pid=Api&P=0&h=180"
              alt="Profile"
              className="profile-img shadow"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-5 mt-5 shadow-lg">
  <div className="container">
    <div className="row align-items-center">
      {/* Info Column (Left) */}
      <div className="col-md-8 text-center d-flex flex-column align-items-center mb-4 mb-md-0 mx-auto">
  <h3 className="fw-bold">Pritam Gaikwad</h3>
  <p className="lead mb-2">A passionate developer on a coding journey 🚀</p>
  <p className="mb-3">Crafting clean and efficient solutions with modern web technologies.</p>

  {/* Optional: Social Links */}
  <div className="d-flex justify-content-center gap-3">
    <a href="#" className="text-white fs-4"><i className="fab fa-github"></i></a>
    <a href="" className="text-white fs-4"><i className="fab fa-linkedin"></i></a>
    <a href="#" className="text-white fs-4"><i className="fab fa-twitter"></i></a>
  </div>
</div>


      {/* Image Column (Right) */}
      <div className="col-md-4 text-center">
        <img
          src="https://tse1.mm.bing.net/th/id/OIP.fdwbXFzypXMF9WZtbp_kyAHaEK?pid=Api&P=0&h=180"
          alt="Profile"
          className="img-fluid rounded-circle border border-white"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>
    </div>

    <hr className="bg-white mt-4" />
    <p className="text-center small mb-0">&copy; {new Date().getFullYear()} NoteNest | Built with ❤️ by Pritam Gaikwad</p>
  </div>
</footer>

    </div>
  );
};

export default About;

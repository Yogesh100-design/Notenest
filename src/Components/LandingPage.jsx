import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <div className="container text-center d-flex flex-column justify-content-center flex-grow-1" style={{ padding: '2rem 0' }}>
        <h1 className="display-3 fw-bold text-primary mb-10" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          Welcome to NoteNest
        </h1>
        <p className="lead mb-5 text-secondary" style={{ fontSize: '1.5rem', maxWidth: '700px', margin: '0 auto' }}>
          Your secure, cloud-based notebook. Capture ideas, organize your life, and access your notes from anywhere.
        </p>
        
        <div className="d-flex justify-content-center gap-3">
          <Link to="/signup" className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm mx-2">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-primary btn-lg px-5 py-3 rounded-pill shadow-sm mx-2">
            Login
          </Link>
        </div>

        <div className="mt-5 row justify-content-center ">
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm p-3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="h1 text-primary mb-3">🔒</div>
                <h5 className="card-title fw-bold">Secure Cloud Storage</h5>
                <p className="card-text text-muted">Your notes are stored securely in the cloud, accessible only by you.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm p-3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="h1 text-primary mb-3">⚡</div>
                <h5 className="card-title fw-bold">Fast & Responsive</h5>
                <p className="card-text text-muted">Experience lightning-fast performance with our optimized interface.</p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100 border-0 shadow-sm p-3" style={{ borderRadius: '15px' }}>
              <div className="card-body">
                <div className="h1 text-primary mb-3">📱</div>
                <h5 className="card-title fw-bold">Access Anywhere</h5>
                <p className="card-text text-muted">Access your notes from any device, anytime, anywhere.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer bg-dark text-white py-4 shadow-lg w-100">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-12 text-center">
              <h5 className="fw-bold mb-2">NoteNest</h5>
              <p className="small mb-2">Crafting clean and efficient solutions with modern web technologies.</p>
              <div className="d-flex justify-content-center gap-3 mb-3">
                <a href="#" className="text-white"><i className="fab fa-github"></i></a>
                <a href="#" className="text-white"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
              </div>
              <hr className="bg-white opacity-25" />
              <p className="small mb-0">&copy; {new Date().getFullYear()} NoteNest | Built with ❤️ by Pritam Gaikwad</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

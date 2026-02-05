import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="landing-page" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center', 
      alignItems: 'center', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '2rem'
    }}>
      <div className="container text-center">
        <h1 className="display-3 fw-bold text-primary mb-4" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
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

        <div className="mt-5 row justify-content-center">
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
    </div>
  );
};

export default LandingPage;

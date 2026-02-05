import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ showAlert }) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "" });

  const signupUser = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

        if (response.ok) {
        // Save JWT token to localStorage
        localStorage.setItem("token", data.authToken || data.JWTdata);
        setCredentials({ name: "", email: "", password: "" }); // clear form
        showAlert("Signup successful!", "success");
        navigate("/notes"); // redirect to home or dashboard
      } else {
        // Display error message from backend
        if (data.error) {
          showAlert(data.error, "danger");
        } else if (data.errors) {
          // Validation errors
          const msg = data.errors.map(err => err.msg).join(", ");
          showAlert(msg, "danger");
        } else {
          showAlert("Signup failed", "danger");
        }
      }
    } catch (error) {
      console.error("Network error or CORS blocked", error);
      showAlert("Network error or server not reachable", "danger");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signupUser(credentials.name, credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{ background: "linear-gradient(to right, #FFDEE9, #B5FFFC)" }}
    >
      <h1 className="text-primary fw-bold text-center mb-4 shadow-sm p-3 px-4 rounded bg-white">
        Sign up to get started with <span className="text-warning">NoteNest</span>
      </h1>

      <div className="col-md-6 col-lg-5">
        <div className="card shadow-lg rounded-4 border-0">
          <div className="card-header bg-primary text-white text-center rounded-top-4">
            <h4 className="mb-0">📝 Sign Up</h4>
          </div>
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-semibold">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control rounded-3 shadow-sm"
                  id="name"
                  value={credentials.name}
                  onChange={onChange}
                  placeholder="Enter full name"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control rounded-3 shadow-sm"
                  id="email"
                  value={credentials.email}
                  onChange={onChange}
                  placeholder="Enter email address"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control rounded-3 shadow-sm"
                  id="password"
                  value={credentials.password}
                  onChange={onChange}
                  placeholder="Create a password"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary rounded-3 shadow">
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="card-footer text-center text-muted rounded-bottom-4">
            <small>
              Already have an account?{" "}
              <Link to="/login" className="text-primary text-decoration-none">
                Login here
              </Link>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

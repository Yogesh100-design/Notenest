import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { showAlert } = props;

  const loginUser = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
  localStorage.setItem("token", data.authToken);

  // ✅ Move this above navigate
  setCredentials({  email: "", password: "" });

  showAlert("Signup successful!", "success");
  navigate("/");
} else {
        props.showAlert("Login failed: Invalid email or password", "danger");
      }
    } catch (error) {
      props.showAlert("Login failed: Server unreachable", "danger");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials.email, credentials.password);
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.id]: e.target.value });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "linear-gradient(to right, #FFDEE9, #B5FFFC)" }}
    >
      <div className="row w-100 justify-content-center">
        <div className="col-md-8 text-center mb-4">
          <h1 className="text-primary fw-bold text-center shadow-sm p-4 rounded bg-white d-inline-block">
            Login first to continue with{" "}
            <span className="text-warning">NoteNest</span>
          </h1>
        </div>

        <div className="col-md-6">
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-header bg-primary text-white text-center rounded-top-4">
              <h4 className="mb-0">🔐 Login</h4>
            </div>
            <div className="card-body p-4">
              <form  onSubmit={handleSubmit} autoComplete="off">
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
                    placeholder="Enter your password"
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary rounded-3 shadow"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center text-muted rounded-bottom-4">
              <small>
                Don't have an account?{" "}
                <Link
                  to="/Signup"
                  className="text-primary text-decoration-none"
                >
                  Sign up
                </Link>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignIn({ setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await axios.post(
      "https://masairevis.alwaysdata.net/api/signin",
      formData
    );

    if (res.data.user) {
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center"
      style={{ background: "linear-gradient(135deg, #141e30, #243b55)" }}>

      <div className="p-4 shadow"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.1)",
          color: "white"
        }}>

        <h2 className="text-center mb-4">Welcome Back</h2>

        <form onSubmit={login}>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-info w-100">
            Sign In
          </button>

        </form>

        <p className="text-center mt-3">
          No account? <Link to="/signup" className="text-info">Sign Up</Link>
        </p>

      </div>

    </div>
  );
}

export default SignIn;
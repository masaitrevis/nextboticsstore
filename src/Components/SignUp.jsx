import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // UI states
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // Submit handler
  const submit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  try {
    // Use FormData
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    const response = await axios.post(
      'https://masairevis.alwaysdata.net/api/signup',
      formData,
      {
        headers: {
          // Axios automatically sets multipart/form-data boundary,
          // so you can omit Content-Type or just leave it
        },
      }
    );

    console.log(response.data);

    setSuccess(response.data.message || 'Signup successful!');

    // Reset form
    setUsername('');
    setEmail('');
    setPhone('');
    setPassword('');

  } catch (err) {
    if (err.response?.data?.message) {
      setError(err.response.data.message);
    } else {
      setError(err.message);
    }
  } finally {
    setLoading(false);
  }
};
return (
  <div 
    className="container-fluid vh-100 d-flex align-items-center justify-content-center"
    style={{
      background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
    }}
  >
    <div className="row w-100">
      
      {/* LEFT SIDE (Branding) */}
      <div className="col-md-6 d-none d-md-flex flex-column justify-content-center text-white p-5">
        <h1 className="fw-bold">NextBotics Store ⚡</h1>
        <p className="mt-3">
          Buy smart electronics, gadgets, and future tech—all in one place.
        </p>
      </div>

      {/* RIGHT SIDE (FORM) */}
      <div className="col-md-6 d-flex justify-content-center">
        <div 
          className="p-4 shadow"
          style={{
            width: "400px",
            borderRadius: "20px",
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(10px)",
            color: "white"
          }}
        >
          <h2 className="text-center mb-4">Create Account</h2>

          <form onSubmit={submit}>
            {loading && <p className="text-warning">Processing...</p>}
            {success && <p className="text-success">{success}</p>}
            {error && <p className="text-danger">{error}</p>}

            <input
              type="text"
              placeholder="Username"
              className="form-control mb-3 bg-transparent text-white"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="form-control mb-3 bg-transparent text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="tel"
              placeholder="Phone Number"
              className="form-control mb-3 bg-transparent text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="form-control mb-3 bg-transparent text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn w-100 mt-2"
              style={{
                background: "#00c6ff",
                border: "none",
                fontWeight: "bold"
              }}
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/signIn" className="text-info">
              Sign In
            </Link>
          </p>
        </div>
      </div>

    </div>
  </div>
);
  
};

export default SignUp;
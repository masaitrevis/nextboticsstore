import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import SignIn from './Components/SignIn';
import SignUp from './Components/SignUp';
import AddProducts from './Components/AddProducts';
import MakePayment from './Components/MakePayment';
import NotFound from './Components/NotFound';
import ProductsPage from './Components/ProductsPage';
import Footer from "./Components/Footer";

function App() {

  // 👤 USER STATE
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  // 🛒 CART (PER USER)
  const [cart, setCart] = useState(() => {
    if (user) {
      return JSON.parse(localStorage.getItem(`cart_${user.email}`)) || [];
    }
    return [];
  });

  const [search, setSearch] = useState("");

  // save cart per user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.email}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  // add to cart
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // remove from cart
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.product_id !== id));
  };

  // logout
  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setCart([]);
    window.location.href = "/";
  };

  return (
    <Router>
      <div
        className="App d-flex flex-column"
        style={{
          minHeight: '100vh',
          background: 'radial-gradient(circle at top left, #0f2027, #203a43, #2c5364)',
          fontFamily: "'Orbitron', sans-serif",
        }}
      >

        {/* HEADER */}
        <header className="py-4 text-center text-white">
          <h1 className="text-info">NextBotics Store</h1>

          {user && (
            <h5 className="text-light">
              Welcome, {user.username}
            </h5>
          )}
        </header>

        {/* NAVBAR */}
        <nav className="navbar navbar-dark bg-dark sticky-top">
          <div className="container">

            <NavLink className="navbar-brand text-info" to="/">
              NextBotics
            </NavLink>

            <div className="ms-auto d-flex gap-2 align-items-center">

              <input
                className="form-control form-control-sm"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <NavLink className="btn btn-sm btn-light" to="/">
                Shop
              </NavLink>

              {/* 🛒 CART */}
              <NavLink className="btn btn-sm btn-warning" to="/checkout">
                Cart ({cart.length})
              </NavLink>

              {/* AUTH */}
              {!user ? (
                <>
                  <NavLink className="btn btn-sm btn-info" to="/signin">
                    Sign In
                  </NavLink>

                  <NavLink className="btn btn-sm btn-outline-info" to="/signup">
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink className="btn btn-sm btn-success" to="/addproducts">
                    Add Product
                  </NavLink>

                  <button className="btn btn-sm btn-danger" onClick={logout}>
                    Logout
                  </button>
                </>
              )}

            </div>

          </div>
        </nav>

        {/* ROUTES */}
        <main className="container mt-4 flex-grow-1">

          <Routes>

            <Route
              path="/"
              element={
                <ProductsPage
                  cart={cart}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                  search={search}
                />
              }
            />

            <Route path="/signup" element={<SignUp />} />

            <Route
              path="/signin"
              element={<SignIn setUser={setUser} />}
            />

            {/* 🔐 PROTECTED ADD PRODUCTS */}
            <Route
              path="/addproducts"
              element={
                user ? <AddProducts /> : <Navigate to="/signin" />
              }
            />

            {/* 🔐 PROTECTED CHECKOUT */}
            <Route
              path="/checkout"
              element={
                !user ? (
                  <Navigate to="/signin" />
                ) : cart.length === 0 ? (
                  <div className="text-white text-center mt-5">
                    <h3>Your cart is empty</h3>
                  </div>
                ) : (
                  <MakePayment
                    cart={cart}
                    setCart={setCart}
                    removeFromCart={removeFromCart}
                    user={user}
                  />
                )
              }
            />

            <Route path="*" element={<NotFound />} />

          </Routes>

        </main>

        {/* ===== FOOTER (FIXED POSITION) ===== */}
        <Footer />

      </div>
    </Router>
  );
}

export default App;
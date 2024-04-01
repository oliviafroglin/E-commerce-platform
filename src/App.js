import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

import homeIcon from "./assets/home.png";
import cartIcon from "./assets/cart.png";

import "./App.css";
function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item.id === product.id);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg">
          <Link to="/" className="navbar-brand">
            AllMart
          </Link>{" "}
          {/* Application name as brand */}
          <div className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <img src={homeIcon} alt="Home" className="nav-icon" />{" "}
                {/* Optional: Text can be added here */}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                <img src={cartIcon} alt="Cart" className="nav-icon" />{" "}
                {/* Optional: Text can be added here */}
              </Link>
            </li>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage addToCart={addToCart} />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

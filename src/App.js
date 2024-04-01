import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./components/HomePage";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";

import homeIcon from "./assets/home.png";
import cartIcon from "./assets/cart.png";
import heartIcon from "./assets/heart.png";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  // Calculate total number of items in cart
  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src={homeIcon} alt="Home" className="nav-icon" />
          </Link>

          {/* AllMart in the center */}
          <div className="navbar-center mx-auto">
            All{" "}
            <img
              src={heartIcon}
              alt="Love"
              width="30"
              className="d-inline-block align-text-top mx-1"
            />{" "}
            Mart
          </div>

          <div className="d-flex justify-content-end">
            <Link to="/cart" className="nav-item">
              <img src={cartIcon} alt="Cart" className="nav-icon" />
              {totalItemsInCart > 0 && (
                <span className="cart-count">{totalItemsInCart}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage addToCart={addToCart} />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
}

export default App;

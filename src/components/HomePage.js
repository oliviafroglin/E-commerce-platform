import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HomePage.css";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async (category = "") => {
    let url = "https://dummyjson.com/products";
    if (category) {
      url += `/category/${category}`;
    }
    try {
      const response = await axios.get(url);
      setProducts(response.data.products || response.data); // Adjust based on API response structure
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
    setShowCategories(false); // Optionally close the dropdown
  };

  return (
    <div className="container">
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name or category..."
        onChange={(e) => fetchProducts(e.target.value)}
      />
      <div className="categories-dropdown">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="categories-toggle"
        >
          Categories
        </button>
        {showCategories && (
          <ul className="categories-menu">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className="categories-item"
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                src={product.thumbnail}
                className="card-img-top"
                alt={product.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
                <button
                  className="btn btn-primary"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HomePage.css";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategories, setShowCategories] = useState(false); // Define showCategories state here

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get("https://dummyjson.com/products");
    setProducts(response.data.products);
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

  const searchProducts = (term) => {
    setSearchTerm(term);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <input
        type="text"
        className="form-control my-3"
        placeholder="Search by name or category..."
        onChange={(e) => searchProducts(e.target.value)}
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
              <li key={index} className="categories-item">
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="row">
        {filteredProducts.map((product) => (
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

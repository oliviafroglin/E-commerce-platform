import React, { useState, useEffect } from "react";
import axios from "axios";
import "../HomePage.css";

function HomePage({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log(
      "Fetching products for page:",
      currentPage,
      "and category:",
      selectedCategory
    );
    fetchProducts();
  }, [currentPage, selectedCategory]);

  useEffect(() => {
    console.log("Fetching categories...");
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    let url = "https://dummyjson.com/products";
    let params = new URLSearchParams({
      skip: (currentPage - 1) * 10,
      limit: 10,
    });

    if (selectedCategory) {
      url += `/category/${selectedCategory}?${params.toString()}`;
    } else {
      url += `?${params.toString()}`;
    }

    console.log("Fetching from URL:", url);
    try {
      const response = await axios.get(url);
      console.log("Products fetched:", response.data.products || response.data);
      setProducts(response.data.products || []);
      const totalProducts = response.data.total || 0;
      setTotalPages(Math.ceil(totalProducts / 10));
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      console.log("Categories fetched:", response.data);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryClick = (category) => {
    console.log("Category clicked:", category);
    setSelectedCategory(category);
    setShowCategories(false);
    setCurrentPage(1); // Reset to page 1 when category changes
  };

  return (
    <div className="container">
      <div className="categories-dropdown">
        <button
          onClick={() => setShowCategories(!showCategories)}
          className="categories-toggle"
        >
          Categories
        </button>
        {showCategories && (
          <ul className="categories-menu">
            <li
              onClick={() => handleCategoryClick("")}
              className="categories-item"
            >
              All Products
            </li>
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
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control my-3"
      />
      <div className="row">
        {products
          .filter((product) =>
            product.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((product) => (
            <div key={product.id} className="col-md-4 mb-4">
              <div className="card">
                <div className="card-img-container">
                  <img
                    src={product.thumbnail}
                    className="card-img-top"
                    alt={product.title}
                  />
                </div>
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

      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;

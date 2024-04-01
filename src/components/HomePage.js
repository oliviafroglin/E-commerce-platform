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
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Resets to page 1 when category changes or a new search is initiated
    setCurrentPage(1);
    fetchProducts(selectedCategory, 1, searchTerm);
    fetchCategories();
  }, [selectedCategory, searchTerm]);

  useEffect(() => {
    fetchProducts(selectedCategory, currentPage, searchTerm);
  }, [currentPage]);

  const fetchProducts = async (category = "", page = 1, search = "") => {
    let url = "https://dummyjson.com/products";
    if (category) {
      url += `/category/${category}`;
    }
    url += `?skip=${(page - 1) * 10}&limit=10`;

    if (search) {
      url += `&search=${search}`;
    }

    try {
      const response = await axios.get(url);
      setProducts(response.data.products || response.data);
      // Calculate total pages if API provides total product count
      const totalProducts = response.data.total;
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
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategories(false);
  };

  return (
    <div className="container">
      <div className="search-bar">
        <form
          onSubmit={(e) => {
            e.preventDefault(); // Prevents the default form submission
            setCurrentPage(1);
            fetchProducts(selectedCategory, 1, searchTerm);
          }}
        >
          <input
            type="text"
            className="form-control my-3"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-primary ml-2" type="submit">
            Search
          </button>
        </form>
      </div>
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
              onClick={() => setSelectedCategory("")}
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
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default HomePage;

import React, { useState, useEffect } from "react";
import axios from "axios";

import { doSearch } from "../../utilities/search";

import Product from "./product/Product";

import arrowBack from "../../assets/icons/arrowBack.png";

import "./home.scss";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");

  const getProductListing = (q) => {
    axios
      .get("https://tiki.vn/api/v2/products", {
        params: {
          limit: 20,
          include: "advertisement",
          aggregations: "2",
          category: 2665,
          trackity_id: "7b450601-7bae-3b61-3c92-13924ff4fdea",
          q,
        },
      })
      .then(function (response) {
        if (response?.data?.data) {
          setProduct(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getProductListing();
  }, []);

  useEffect(() => {
    doSearch(search, getProductListing);
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const listProduct = product.map((item, index) => (
    <Product key={index} item={item} />
  ));

  return (
    <div className="product-listing">
      <header>
        <img className="black-icon" src={arrowBack} alt="arrow back" />
        <div className="text-field">
          <input
            placeholder="Nhập tên, mã sản phẩm"
            onChange={handleChange}
            type="text"
            value={search}
          />
        </div>
      </header>

      {listProduct}
    </div>
  );
}

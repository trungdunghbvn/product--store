import React from "react";
import { useNavigate } from "react-router-dom";

import { formatPrice, saleOff } from "../../../utilities/price";

import "./product.scss";

export default function Product({ item }) {
  const navigate = useNavigate();

  const hasDiscount = item.original_price > item.price;

  return (
    <div
      className="product"
      onClick={() => navigate(`/product/${item.url_path}`)}
    >
      <div className="product__thumbnail">
        <img src={item.thumbnail_url} alt={item.name} />
      </div>
      <div className="product__info">
        <div className="product-name">
          <span>{item.name}</span>
        </div>
        <div className="product-price">
          <div className="product-price__price">{formatPrice(item.price)}</div>
          {hasDiscount && (
            <div className="has-discount">
              <div className="product-price__original">
                {formatPrice(item.original_price)}
              </div>
              <div className="product-price__discount">
                {saleOff(item.price, item.original_price)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs } from "../../common";
import { classNames } from "../../utilities/css";

import ImagesWapper from "./images-wapper";
import AttributeItem from "./attribute-item";

import arrowBack from "../../assets/icons/arrowBackBlack.png";
import Cart from "../../assets/icons/cartOutlined.png";
import addCircle from "../../assets/icons/addCircle.png";
import removeCircle from "../../assets/icons/removeCircle.png";

import { formatPrice, saleOff } from "../../utilities/price";

import "./product-detail.scss";

export default function About() {
  const navigate = useNavigate();
  const { p: productUrl } = useParams();

  const [product, setProduct] = useState();
  const [selected, setSelected] = useState("description");
  const [expandable, setExpandable] = useState(false);
  const [added, setAdded] = useState(1);

  useEffect(() => {
    const productId = productUrl.match(/(?<=p)[0-9]+(?=\.html)/);
    if (productId?.[0]) {
      axios
        .get("https://tiki.vn/api/v2/products/" + productId[0], {
          params: {
            platform: "mweb",
          },
        })
        .then(function (response) {
          if (response?.data) {
            setProduct(response.data);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const hasDiscount = product && product.original_price > product.price;

  const tabs = [
    {
      content: "Mô tả sản phẩm",
      panelID: "description",
    },
    {
      content: "Thông số kỹ thuật",
      panelID: "specifications",
    },
    {
      content: "So sánh giá",
      panelID: "compare",
    },
  ];

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const createMarkup = () => {
    return { __html: product.description };
  };

  return (
    <div className="product-detail">
      {product && (
        <>
          <header>
            <div
              onClick={() => {
                navigate(-1);
              }}
            >
              <img className="black-icon" src={arrowBack} alt="arrow back" />
            </div>
            <div className="header-product">
              <div className="header-product__name">{product.name}</div>
              <div className="header-product__price">
                <span>{formatPrice(product.price)}</span>
              </div>
            </div>
            <div className="header-cart">
              <img className="cart__icon" src={Cart} alt="cart" />
            </div>
          </header>
          <div className="detail-info">
            <div className="images-wrapper">
              <ImagesWapper images={product.images} />
            </div>
            <div className="detail-wrapper">
              <div className="detail-wrapper__product-name">{product.name}</div>
              <div className="detail-wrapper__product-sku">
                <span>Mã SP: </span>
                <span className="product-sku__code">{product.sku}</span>
              </div>
              <div className="detail-wrapper__product-price">
                <span className="product__price">
                  {formatPrice(product.price)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="product__original-price">
                      {formatPrice(product.original_price)}
                    </span>
                    <span className="product__has-discount">
                      {saleOff(product.price, product.original_price)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="expandable">
            <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
              <div
                className={classNames(
                  "expandable__inner",
                  expandable && "expandable__inner--expanded"
                )}
              >
                {selected === "description" && (
                  <div className="expandable__description">
                    <div dangerouslySetInnerHTML={createMarkup()}></div>
                  </div>
                )}
                {selected === "specifications" && (
                  <div className="expandable__attribute">
                    <AttributeItem
                      attributes={product.specifications[0].attributes}
                    />
                  </div>
                )}
              </div>
              <div
                className="expandable__trigger"
                onClick={() => setExpandable((expandable) => !expandable)}
              >
                {expandable ? "Thu gọn" : "Hiển thị nhiều hơn"}
              </div>
            </Tabs>
          </div>
          <div className="add-cart">
            <div className="add-cart__action">
              <div
                className="action-circle"
                onClick={() => {
                  if (added > 1) {
                    setAdded((added) => added - 1);
                  }
                }}
              >
                <img src={removeCircle} alt="remove circle"></img>
              </div>
              <div className="action-circle action-circle--total">{added}</div>
              <div
                className="action-circle"
                onClick={() => setAdded((added) => added + 1)}
              >
                <img src={addCircle} alt="add circle"></img>
              </div>
            </div>
            <div className="add-cart__btn">
              {formatPrice(product.price * added)} đ
            </div>
          </div>
        </>
      )}
    </div>
  );
}

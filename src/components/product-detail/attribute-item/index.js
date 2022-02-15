import React from "react";
import "./attribute.scss";

export default function AttributeItem({ attributes = [] }) {
  const createMarkup = (value) => {
    return { __html: value };
  };

  const listItems = attributes.map((item, index) => (
    <div className="attribute-list__item" key={index}>
      <div className="attribute-list__item__name">{item.name}</div>
      <div
        className="attribute-list__item__value"
        dangerouslySetInnerHTML={createMarkup(item.value)}
      >
      </div>
    </div>
  ));

  return <div className="attribute-list">{listItems}</div>;
}

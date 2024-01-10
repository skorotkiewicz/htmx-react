import React from "react";

const ItemCount = ({ itemsLeft }: any) => {
  return (
    <span className="todo-count" id="todo-count" hx-swap-oob="true">
      <strong>{itemsLeft} item left</strong>
    </span>
  );
};

export default ItemCount;

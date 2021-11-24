import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, userID }) => {
  const { title, thumbnail, price, sale, quantityleft, _id } = {
    ...item,
  };

  return (
    <Link to={"/item/" + _id}>
      <div className="flex card-container transition-shadow w-fit-content hover:shadow gap-3 max-w-sm">
        <img
          className="max-w-xs w-[30%] min-w-[150px]"
          src={thumbnail}
          alt={title}
        />
        <span className="font-bold">{title}</span>
        <p className="font-medium">
          {price - (price / 100) * sale}€{" "}
          {sale ? <span className="italic opacity-60">-{sale}%</span> : null}
        </p>
        {!quantityleft ? (
          <span className="text-warning font-bold">Out of stock</span>
        ) : (
          <p>Only: {quantityleft} left !</p>
        )}
      </div>
    </Link>
  );
};

export default CartItem;

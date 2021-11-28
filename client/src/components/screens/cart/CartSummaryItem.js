import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ item, userID }) => {
  const { title, thumbnail, price, sale, quantityleft, _id } = {
    ...item,
  };

  return (
    <Link to={"/item/" + _id}>
      <div className="flex gap-8 shadow-md p-8 rounded-lg bg-white z-10 cursor-pointer flex-grow transition-shadow m-3 hover:shadow">
        <img
          className="max-w-[200px] w-[30%] min-w-[150px]"
          src={thumbnail}
          alt={title}
        />
        <div className="flex flex-col">
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
      </div>
    </Link>
  );
};

export default CartItem;

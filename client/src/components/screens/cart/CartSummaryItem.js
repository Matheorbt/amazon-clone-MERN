import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ history, item }) => {
  const { title, thumbnail, price, sale, quantityleft, _id } = {
    ...item,
  };
  const [error, setError] = useState("");
  const handleRemoveCartItem = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.delete(
        "/api/cart/removeitembyid/" + _id,
        config
      );
    } catch (error) {
      setError("Error while trying to add item to cart");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };
  return (
    <>
      <div className="flex items-start justify-between gap-8 shadow-md p-8 rounded-lg bg-white cursor-pointer flex-grow transition-shadow m-3 hover:shadow">
        <div
          className="flex flex-grow"
          onClick={() => history.push("/item/" + _id)}
        >
          <img
            className="max-w-[200px] w-[30%] min-w-[150px]"
            src={thumbnail}
            alt={title}
          />
          <div className="flex flex-col">
            <span className="font-bold">{title}</span>
            <p className="font-medium">
              {price - (price / 100) * sale}€{" "}
              {sale ? (
                <span className="italic opacity-60">-{sale}%</span>
              ) : null}
            </p>
            {!quantityleft ? (
              <span className="text-warning font-bold">Out of stock</span>
            ) : (
              <p>Only: {quantityleft} left !</p>
            )}
          </div>
        </div>
        <button onClick={handleRemoveCartItem}>
          <span className="text-warning font-bold">Remove item</span>
        </button>
      </div>
    </>
  );
};

export default CartItem;

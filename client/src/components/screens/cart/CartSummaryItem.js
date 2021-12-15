import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CartItem = ({ itemID, history, quantity }) => {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchItemByID = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      if (!localStorage.getItem("authToken")) {
        history.push("/login");
      }

      try {
        const { data } = await axios.get(
          "/api/items/fetchitembyid/" + itemID,
          config
        );
        setItem(data.item);
        setLoading(false);
      } catch (error) {
        setError("Error while trying to retrieve item by ID");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemByID();
  }, [loading]);

  const { title, thumbnail, price, sale, quantityLeft, _id } = {
    ...item,
  };

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
      <div className="flex flex-col items-start justify-between gap-8 shadow-md p-8 rounded-lg bg-white cursor-pointer flex-grow transition-shadow hover:shadow lg:flex lg:flex-row">
        <div
          className="flex flex-grow gap-4"
          onClick={() => history.push("/item/" + _id)}
        >
          <img
            className="max-w-[200px] max-h-[200px]"
            src={thumbnail}
            alt={title}
          />
          <div className="flex flex-col">
            <span className="font-bold">{title}</span>
            <p className="font-medium">
              {Math.floor(price - (price / 100) * sale)}€{" "}
              {sale ? (
                <span className="italic opacity-60">-{sale}%</span>
              ) : null}
            </p>
            {!quantityLeft ? (
              <span className="text-warning font-bold">Out of stock</span>
            ) : (
              <p>Only: {quantityLeft} left !</p>
            )}
          </div>
        </div>
        <div className="flex gap-4 items-center">
          Quantity:
          <button className="btn-primary">
            <i className="fa fa-plus" aria-hidden="true"></i>
          </button>
          {quantity}
          <button className="btn-primary">
            <i className="fa fa-minus" aria-hidden="true"></i>
          </button>
        </div>
        <button onClick={handleRemoveCartItem}>
          <span className="btn-warning">Remove item</span>
        </button>
      </div>
    </>
  );
};

export default CartItem;

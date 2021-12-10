import axios from "axios";
import React, { useEffect, useState } from "react";
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

  return (
    <Link to={"/item/" + _id}>
      <div className="flex card-container transition-shadow m-3 w-fit-content hover:shadow gap-3 max-w-sm">
        {quantity > 1 ? (
          <span className="font-bold self-end">{quantity}</span>
        ) : null}
        <img
          className="max-w-xs w-[30%] min-w-[150px]"
          src={thumbnail}
          alt={title}
        />
        <span className="font-bold">{title}</span>

        <p className="font-medium">
          {Math.floor(price - (price / 100) * sale)}€{" "}
          {sale ? <span className="italic opacity-60">-{sale}%</span> : null}
        </p>
        {!quantityLeft ? (
          <span className="text-warning font-bold">Out of stock</span>
        ) : (
          <p>Only: {quantityLeft} left !</p>
        )}
      </div>
    </Link>
  );
};

export default CartItem;

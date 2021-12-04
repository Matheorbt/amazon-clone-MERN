import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PreviousOrderItem = ({ history, itemID }) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState([""]);
  const [loading, setLoading] = useState([""]);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

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
        console.log(item);
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

  return (
    <>
      <div className="flex items-start justify-between gap-8 shadow-md p-8 rounded-lg bg-white cursor-pointer flex-grow transition-shadow m-3 hover:shadow">
        <div
          className="flex flex-grow"
          onClick={() => history.push("/item/" + itemID)}
        >
          <img
            className="max-w-[200px] w-[30%] min-w-[150px]"
            src={item.thumbnail}
            alt={item.title}
          />
          <div className="flex flex-col">
            <span className="font-bold">{item.title}</span>
            <p className="font-medium">
              {item.price - (item.price / 100) * item.sale}€{" "}
              {item.sale ? (
                <span className="italic opacity-60">-{item.sale}%</span>
              ) : null}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousOrderItem;

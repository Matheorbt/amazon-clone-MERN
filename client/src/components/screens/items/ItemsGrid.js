import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import ItemCard from "./ItemCard";

const ItemsGrid = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [itemsList, setItemsList] = useState([""]);

  useEffect(() => {
    const fetchItemList = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/items/list", config);
        const itemListRaw = JSON.stringify(data);
        const itemList = JSON.parse(itemListRaw);
        setItemsList(itemList.itemsList);
      } catch (error) {
        setError("Error while trying to retrieve items");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemList();
  });

  return (
    <>
      <ul className="flex">
        {itemsList.map((item) => (
          <ItemCard item={item} />
        ))}
      </ul>
      {error && <span className="text-warning font-bold">{error}</span>}
      {success && <span className="text-success font-bold">{success}</span>}
    </>
  );
};

export default ItemsGrid;

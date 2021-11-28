import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import ItemCard from "./ItemCard";

const ItemsGrid = () => {
  const [error, setError] = useState("");
  const [itemsList, setItemsList] = useState([""]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      } catch (error) {
        setError("Error while trying to retrieve items");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemList();
  }, []);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <div>
          <ul className="place-items-center grid gap-y-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {itemsList.map((item) => (
              <li key={item["_id"]}>
                <ItemCard key={item["_id"]} item={item} />
              </li>
            ))}
          </ul>
          {error && <span className="text-warning font-bold">{error}</span>}
        </div>
      )}
    </>
  );
};

export default ItemsGrid;

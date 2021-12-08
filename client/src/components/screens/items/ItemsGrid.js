import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import ItemCard from "./ItemCard";

const ItemsGrid = () => {
  const tagList = [
    "House",
    "Nutrition",
    "Workout",
    "Health",
    "House furniture",
    "School",
    "Art",
    "Shoes",
    "Mode",
    "Kitchen",
    "Plant",
  ];
  const [error, setError] = useState("");
  const [itemsList, setItemsList] = useState([""]);
  const [loading, setLoading] = useState(true);

  const [filterMaximumPrice, setFilterMaximumPrice] = useState(0);
  const [filterMinimumPrice, setFilterMinimumPrice] = useState(0);
  const [tagFilter, setTagFilter] = useState("");

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
  }, [filterMaximumPrice, filterMinimumPrice]);
  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <div className="min-h-screen">
          <div className="flex gap-2 p-4 rounded-lg shadow-xl bg-white m-4">
            <div className="flex flex-col gap-2">
              <label>Prix maximum:{filterMaximumPrice}</label>
              <input
                type="number"
                onChange={(e) => setFilterMaximumPrice(e.target.value)}
                className="border border-black"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Prix minimum:{filterMinimumPrice}</label>
              <input
                type="number"
                onChange={(e) => setFilterMinimumPrice(e.target.value)}
                className="border border-black"
              />
            </div>
            {tagList.map((tag) => (
              <button onClick={() => setTagFilter(tag)}>{tag}</button>
            ))}
            <div className="flex flex-col gap-2">
              <label>Tag:{tagFilter}</label>
              <input
                type="text"
                onChange={(e) => setTagFilter(e.target.value)}
                className="border border-black"
              />
            </div>
          </div>
          <ul className="place-items-center grid gap-y-8 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
            {itemsList
              .filter(
                (value) =>
                  Math.floor(value.price - (value.price / 100) * value.sale) <=
                  (filterMaximumPrice ? filterMaximumPrice : 10000)
              )
              .filter(
                (value) =>
                  Math.floor(value.price - (value.price / 100) * value.sale) >=
                  (filterMinimumPrice ? filterMinimumPrice : 0)
              )
              .filter((value) => value.tags.includes(tagFilter))
              .map((item) => (
                <li key={item["_id"]} className="h-full w-full">
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

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
  const [tagFilter, setTagFilter] = useState([]);

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
          <div className="flex flex-col gap-2 justify-start items-start p-4 rounded-lg shadow-xl bg-white m-4">
            <button
              className="btn-warning"
              onClick={() => {
                setFilterMaximumPrice(0);
                setFilterMinimumPrice(0);
                setTagFilter([]);
              }}
            >
              Clear filter
            </button>
            <div class="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <label>Prix maximum:{filterMaximumPrice}</label>
                  <input
                    type="number"
                    value={filterMaximumPrice}
                    onChange={(e) => setFilterMaximumPrice(e.target.value)}
                    className="border border-black"
                    min={filterMinimumPrice + 1}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label>Prix minimum:{filterMinimumPrice}</label>
                  <input
                    type="number"
                    value={filterMinimumPrice}
                    onChange={(e) => setFilterMinimumPrice(e.target.value)}
                    className="border border-black"
                    max={filterMaximumPrice - 1}
                    min={0}
                  />
                </div>
              </div>
              <ul className="flex gap-2">
                {tagList.map((tag) => (
                  <li>
                    <button
                      className="p-2 rounded-lg shadow-md transition-shadow hover:shadow h-fit-content"
                      onClick={() => {
                        tagFilter.includes(tag)
                          ? setTagFilter(
                              tagFilter.filter((item) => item !== tag)
                            )
                          : setTagFilter([...tagFilter, tag]);
                      }}
                    >
                      {tagFilter.includes(tag) ? (
                        <div>
                          {tag} <i class="fa fa-times" aria-hidden="true"></i>
                        </div>
                      ) : (
                        tag
                      )}
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <div className="flex">
                  Tag:{" "}
                  <ul className="flex">
                    {tagFilter.length
                      ? tagFilter.map((tag, index) =>
                          index === tagFilter.length ? (
                            <li>{tag}</li>
                          ) : (
                            <li>{tag},</li>
                          )
                        )
                      : null}
                  </ul>
                </div>
              </div>
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
              // .filter((value) =>
              //   tagFilter.includes(value.tags.map((tag) => tag))
              // )
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

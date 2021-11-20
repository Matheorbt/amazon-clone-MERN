import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Item = () => {
  const [error, setError] = useState("");

  const [item, setItem] = useState([""]);

  const { itemID } = useParams();

  useEffect(() => {
    const fetchItemByID = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get(
          "/api/items/fetchItemByID/" + itemID,
          config
        );
        setItem(data.item);
      } catch (error) {
        setError("Error while trying to retrieve item by ID");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemByID();
  }, []);

  return (
    <>
      {item.title}
      <h1>item</h1>
      <h1>item</h1>
    </>
  );
};

export default Item;

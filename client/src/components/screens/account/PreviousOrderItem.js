import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactLoading from "react-loading";

const PreviousOrderItem = ({ history, itemID }) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState([""]);
  const [loading, setLoading] = useState(true);
  console.log(itemID);
  console.log("item id =" + typeof itemID);

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
      {loading ? (
        <div className="flex justify-center items-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <div className="flex items-start justify-between gap-8  bg-white cursor-pointer flex-grow">
          <div
            className="flex flex-grow gap-4"
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
      )}
    </>
  );
};

export default PreviousOrderItem;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

import Navbar from "../Navbar";

const Item = ({ history }) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState([""]);
  const [loading, setLoading] = useState(true);

  const { itemID } = useParams();

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

      try {
        const { data } = await axios.get(
          "/api/items/fetchItemByID/" + itemID,
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
  }, []);
  console.log(item);
  return (
    <>
      <Navbar />
      {loading ? (
        <div className="w-[100%] flex items-center justify-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <section className="flex m-8 gap-2 items-start justify-center">
          <div className="flex">
            <ul>
              {item.images
                ? item.images.map((image) => (
                    <li>
                      <img
                        className="w-[150px]"
                        src={image}
                        alt={item.title}
                      ></img>
                    </li>
                  ))
                : null}
            </ul>
            <div>
              <img src={item.thumbnail} alt={item.title} />
            </div>
          </div>
          <div className="flex-col gap-2">
            <h1 className="font-bold text-lg">{item.title}</h1>
            <p>{item.description}</p>
            <ul className="flex gap-2">
              {item.tags
                ? item.tags.map((tag) => (
                    <li>
                      <span className="p-[0.2rem] border-solid border-2 border-light-blue-500 rounded-lg">
                        {tag}
                      </span>
                    </li>
                  ))
                : null}
            </ul>
            <p className="font-medium">
              Price: {item.price - (item.price / 100) * item.sale}€
            </p>
            {!item.quantityleft ? (
              <span className="text-warning">Out of stock</span>
            ) : (
              <p>Only: {item.quantityleft} left !</p>
            )}
            <br />
            <span>Rating:{item.rating}/5</span>
          </div>
        </section>
      )}
    </>
  );
};

export default Item;

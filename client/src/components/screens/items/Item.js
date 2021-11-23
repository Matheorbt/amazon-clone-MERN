import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

import Navbar from "../Navbar";

const Item = ({ history }) => {
  const [error, setError] = useState("");
  const [item, setItem] = useState([""]);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([""]);

  const { itemID } = useParams();

  useEffect(() => {
    console.log("useffect trigger");
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
          "/api/items/fetchItemByID/" + itemID,
          config
        );
        setItem(data.item);
        setLoading(false);
        setThumbnail(item.thumbnail);
        setImages([...item.images, item.thumbnail]);
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
      <Navbar />
      {loading ? (
        <div className="w-[100%] flex items-center justify-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <section className="flex m-8 gap-2 items-start justify-center">
          <div className="flex items-center gap-5">
            <ul>
              {images
                ? images.map((image) => (
                    <li key={image} onClick={() => setThumbnail(image)}>
                      <img
                        className={
                          image !== thumbnail
                            ? "w-[100px] p-3"
                            : "w-[125px] border-2 border-black"
                        }
                        src={image}
                        alt={item.title}
                      ></img>
                    </li>
                  ))
                : null}
            </ul>
            <div>
              <img
                src={thumbnail}
                alt={item.title}
                className="min-w-[250px] w-[25rem] max-w-[350px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-lg">{item.title}</h1>
            <p>{item.description}</p>
            <ul className="flex gap-2">
              {item.tags
                ? item.tags.map((tag) => (
                    <li key={tag}>
                      <span className="p-[0.5rem] rounded-lg shadow-lg">
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
            <div>
              <i
                className={
                  item.rating >= 1
                    ? "fa fa-star text-[1.5rem] text-secondary-orange"
                    : "fa fa-star"
                }
                aria-hidden="true"
              ></i>
              <i
                className={
                  item.rating >= 2
                    ? "fa fa-star text-[1.5rem] text-secondary-orange"
                    : "fa fa-star"
                }
                aria-hidden="true"
              ></i>
              <i
                className={
                  item.rating >= 3
                    ? "fa fa-star text-[1.5rem] text-secondary-orange"
                    : "fa fa-star"
                }
                aria-hidden="true"
              ></i>
              <i
                className={
                  item.rating >= 4
                    ? "fa fa-star text-[1.5rem] text-secondary-orange"
                    : "fa fa-star"
                }
                aria-hidden="true"
              ></i>
              <i
                className={
                  item.rating >= 5
                    ? "fa fa-star text-[1.5rem] text-secondary-orange"
                    : "fa fa-star text-[1.5rem] text-white"
                }
                aria-hidden="true"
              ></i>
            </div>

            <span>Rating:{item.rating}/5</span>
          </div>
        </section>
      )}
    </>
  );
};

export default Item;

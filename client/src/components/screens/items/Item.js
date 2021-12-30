import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Rating from "react-rating";

import Navbar from "../Navbar";

const Item = ({ history }) => {
  const [error, setError] = useState("");
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  const [item, setItem] = useState([""]);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([""]);

  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(0);

  const [itemRating, setItemRating] = useState(0);

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
          "/api/items/fetchitembyid/" + itemID,
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

    const getAverageRating = () => {
      let average = 0;

      item.comment.map((comment) => (average += comment.rating));
      average = average / item.comment.length;
      setItemRating(Math.round(average * 10) / 10);
    };
    fetchItemByID();
    item.comment ? getAverageRating() : setItemRating(3);
  }, [loading, item.comment]);

  const handleAddItemToCart = async () => {
    if (item.quantityLeft === 0) {
      setCartError("No item left");
      setTimeout(() => {
        setCartError("");
      }, 5000);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get(
        "/api/cart/additembyid/" + itemID,
        config
      );
      setCartSuccess("Item added to cart successfuly !");
      setTimeout(() => {
        setCartSuccess("");
      }, 5000);
    } catch (error) {
      setError("Error while trying to add item to cart");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleDirectBuy = async () => {
    if (item.quantityLeft === 0) {
      setCartError("No item left");
      setTimeout(() => {
        setCartError("");
      }, 5000);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    try {
      const { data } = await axios.get(
        "/api/cart/additembyid/" + itemID,
        config
      );
      history.push("/checkout");
    } catch (error) {
      setError("Error while trying to add item to cart");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const handleWishListAdd = () => {
    window.alert("add item to list");
  };

  const createComment = async (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        commentRating: commentRating,
        commentContent: commentContent,
      },
    };
    try {
      const { data } = await axios.get(
        "/api/items/addcomment/" + itemID,
        config
      );
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar history={history} />
      {loading ? (
        <div className="w-[100%] flex items-center justify-center min-h-screen">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="flex-col m-8 justify-between lg:flex lg:flex-row">
            <section className="flex flex-col gap-5 items-start justify-center lg:flex lg:flex-row">
              <div className="flex flex-col items-center gap-5 lg:flex lg:flex-row">
                <ul className="flex lg:flex lg:flex-col">
                  {images
                    ? images.map((image) => (
                        <li
                          className="cursor-pointer"
                          key={image}
                          onClick={() => setThumbnail(image)}
                        >
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
                    className="min-w-[250px] w-[25rem] max-w-[250px]"
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

                {!item.quantityLeft ? (
                  <span className="text-warning">Out of stock</span>
                ) : (
                  <p>Only: {item.quantityLeft} left !</p>
                )}
                <div className="flex justify-center gap-2 items-center">
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    initialRating={itemRating ? itemRating : 2.5}
                    readonly={true}
                  />
                  <span className="italic">
                    {itemRating ? itemRating : 2.5}
                  </span>
                </div>
              </div>
            </section>
            <div className="flex flex-col gap-3 shadow-md rounded-lg p-3">
              <p className="font-medium text-lg text-warning">
                {Math.floor(item.price - (item.price / 100) * item.sale)}€
              </p>
              <span className="font-semibold text-warning">{cartError}</span>
              <span className="font-semibold text-success max-w-full">
                {cartSuccess}
              </span>
              <button className="btn-secondary" onClick={handleAddItemToCart}>
                Add to cart
              </button>
              <button className="btn-primary" onClick={handleDirectBuy}>
                Buy now
              </button>
              <p>
                <span className="opacity-70">Expédié par</span> new field db
              </p>
              <p>
                <span className="opacity-70">Vendu par</span> Amazon
              </p>
              <div onClick={handleWishListAdd}>Ajouter a une liste d'envie</div>
            </div>
          </div>
          <hr />
          <div className="flex flex-col">
            <div>Produits similaires</div>
            <div className="flex flex-col gap-2 m-4">
              <h1 className="font-bold text-2xl">Rédiger un commentaire</h1>
              <form
                onSubmit={createComment}
                className="flex flex-col gap-4 shadow-md bg-white p-4"
              >
                <div className="form-group">
                  <label htmlFor="name">Content:</label>
                  <textarea
                    type="text"
                    required
                    id="commentContent"
                    placeholder="Enter content"
                    autoComplete="no"
                    onChange={(e) => setCommentContent(e.target.value)}
                    tabIndex={1}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="rating">Select a rating:</label>
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    onClick={setCommentRating}
                    initialRating={commentRating}
                    tabIndex={2}
                  />
                </div>
                <button className="btn-primary" type="submit" tabIndex={3}>
                  Confirm
                </button>
              </form>
            </div>
            <ul className="flex flex-col justify-center items-stretch gap-2">
              {item.comment.map((comment) => (
                <li
                  key={comment.user}
                  className="flex flex-col bg-white gap-6 shadow-md p-8 rounded-lg m-4"
                >
                  <div className="flex justify-between">
                    <div className="flex gap-2 items-center">
                      <img
                        src="https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/people19.png"
                        alt="user profile"
                        className="rounded-full"
                        width={50}
                      />
                      <span className="font-bold">Jhon Doe</span>
                    </div>
                    <span className="font-bold">Le 2 décembre 2021</span>
                  </div>
                  <Rating
                    emptySymbol="fa fa-star-o fa-2x"
                    fullSymbol="fa fa-star fa-2x"
                    fractions={2}
                    initialRating={comment.rating}
                    readonly={true}
                  />
                  <p className="shadow-inner p-2 rounded-md">
                    {comment.content}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Item;

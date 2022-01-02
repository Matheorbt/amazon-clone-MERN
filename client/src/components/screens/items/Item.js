import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";
import Rating from "react-rating";

import Navbar from "../Navbar";
import ItemCard from "../items/ItemCard";

const Item = ({ history }) => {
  const [error, setError] = useState("");
  const [cartError, setCartError] = useState("");
  const [cartSuccess, setCartSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [itemsListLoading, setItemsListLoading] = useState(true);

  const [item, setItem] = useState([""]);
  const [itemsList, setItemsList] = useState([""]);
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([""]);

  const [filteredList, setFilteredList] = useState([""]);

  const [commentContent, setCommentContent] = useState("");
  const [commentRating, setCommentRating] = useState(0);

  const [itemRating, setItemRating] = useState(0);

  const { itemID } = useParams();

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);

  useEffect(() => {
    const fetchItemByID = async () => {
      setLoading(true);
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
        // Source du problème
        setThumbnail(data.item.thumbnail);
        setImages([...data.item.images, data.item.thumbnail]);
        //
        setLoading(false);
      } catch (error) {
        setLoading(true);
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

    item.comment ? getAverageRating() : setItemRating(-1);

    return () => {
      setItem([""]);
    };
  }, [itemID]);

  useEffect(() => {
    setItemsListLoading(true);
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
        // Source du problème
        setFilteredList(
          itemList.itemsList.filter((itemListElement) =>
            item.tags.some((f) => itemListElement.tags.includes(f))
          )
        );
        //
        setItemsListLoading(false);
      } catch (error) {
        setItemsListLoading(true);
        setError("Error while trying to retrieve items");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemList();
  }, [itemID, item]);

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
      await axios.get("/api/cart/additembyid/" + itemID, config);
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
      await axios.get("/api/cart/additembyid/" + itemID, config);
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
      await axios.get("/api/items/addcomment/" + itemID, config);
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
      {error}
      {loading ? (
        <div className="w-[100%] flex items-center justify-center min-h-screen">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <div className="flex flex-col gap-5 mb-4">
          <div className="flex-col m-8 justify-between lg:flex lg:flex-row">
            <section className="flex flex-col gap-5 items-start justify-center lg:flex lg:flex-row">
              <div className="flex flex-col items-center gap-5 lg:flex lg:flex-row">
                <ul className="flex lg:flex lg:flex-col">
                  {images
                    ? images.map((image, index) => (
                        <li
                          className="cursor-pointer"
                          key={image + index}
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
                {!itemRating ? (
                  <div className="flex justify-center gap-2 items-center">
                    <span className="italic">No review on this item yet</span>
                  </div>
                ) : (
                  <div className="flex justify-center gap-2 items-center">
                    <Rating
                      emptySymbol="fa fa-star-o fa-2x"
                      fullSymbol="fa fa-star fa-2x"
                      fractions={2}
                      initialRating={itemRating}
                      readonly={true}
                    />
                    <span className="italic">{itemRating}</span>
                  </div>
                )}
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
          <div className="flex flex-col justify-center mx-4 scroll">
            {itemsListLoading ? (
              <div className="w-[100%] flex items-center justify-center min-h-screen">
                <ReactLoading
                  type="bubbles"
                  color="#232F3F"
                  height={50}
                  width={50}
                />
              </div>
            ) : (
              <div>
                <h1 className="font-bold text-xl">
                  More items comporting the tags{" "}
                  {item.tags.map((tag, index) => (
                    <span key={tag + index}>
                      "{tag}"{index + 1 === item.tags.length ? null : ","}
                    </span>
                  ))}
                </h1>
                <ul className="flex overflow-x-scroll gap-10">
                  {filteredList.map((item) => (
                    <li key={item["_id"]}>
                      <ItemCard key={item["_id"]} item={item} />
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-2 m-4">
              <hr className="my-4" />
              <h1 className="font-bold text-2xl">Write a review</h1>
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
              {item.comment.length ? (
                item.comment.map((comment, index) => (
                  <li
                    key={comment.user + index}
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
                ))
              ) : (
                <span className="self-center font-bold text-xl">
                  No comment yet
                </span>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;

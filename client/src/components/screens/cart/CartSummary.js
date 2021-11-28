import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

import Navbar from "../Navbar";
import CartSummaryItem from "../cart/CartSummaryItem.js";

const CartSummary = ({ history }) => {
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState([""]);

  const [totalCart, setTotalCart] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/profile/info", config);
        const userInfosRaw = JSON.stringify(data.data);
        const userInfos = JSON.parse(userInfosRaw);
        setUserInfo(userInfos);
        setLoading(false);
        setTotalCart(0);
        userInfo.shoppingBag
          ? userInfo.shoppingBag.map((cartItem) =>
              setTotalCart(
                totalCart +
                  cartItem.price -
                  (cartItem.price / 100) * cartItem.sale
              )
            )
          : setTotalCart(0);
      } catch (error) {
        setError("Error while trying to retrieve user infos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    getCurrentUser();
  }, [history, loading, userInfo.shoppingBag]);

  const handleEmptyCart = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.delete("/api/cart/clear", config);
    } catch (error) {
      setError("Error while trying to clear the cart");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="w-[100%] flex items-center justify-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="flex gap-5 divide-x divide-black p-3  w-[100%]">
            <div className="flex-col gap-2 p-3  w-[100%]">
              <h3 className="font-bold">Votre panier</h3>
              {totalCart ? <h3>Total: {totalCart}</h3> : null}
              {userInfo.shoppingBag ? (
                userInfo.shoppingBag.length > 0 ? (
                  <button className="text-warning" onClick={handleEmptyCart}>
                    Empty cart
                  </button>
                ) : null
              ) : null}

              {userInfo.shoppingBag ? (
                userInfo.shoppingBag.length > 0 ? (
                  <ul className="flex flex-col gap-2 w-[100%]">
                    {userInfo["shoppingBag"].map((cartItem) => (
                      <li key={cartItem._id}>
                        <CartSummaryItem item={cartItem} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <span>Votre panier est vide</span>
                )
              ) : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartSummary;

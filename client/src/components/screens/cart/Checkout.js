import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Navbar";
import CartSummaryItem from "./CartSummaryItem";

const CartSummary = ({ history }) => {
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState([""]);

  const [totalCart, setTotalCart] = useState(0);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let tempTotalCart = 0;

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
        userInfo.shoppingBag
          ? userInfo.shoppingBag.forEach((cartItem) => {
              tempTotalCart +=
                cartItem.price - (cartItem.price / 100) * cartItem.sale;
            })
          : (tempTotalCart = 0);
        setTotalCart(tempTotalCart);
      } catch (error) {
        setError("Error while trying to retrieve user infos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    getCurrentUser();
  }, [history, loading, userInfo.shoppingBag]);

  const hanldeCheckout = async () => {
    let idsList = [];
    userInfo.shoppingBag.forEach((item) => {
      idsList.push(item._id);
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.post(
        "/api/cart/checkout",
        {
          idsList,
        },
        config
      );
      history.push("/confirmorder/" + data.order._id.toString());
    } catch (error) {
      setError("Error while trying to attempt checkout");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen">
        <span className="font-bold">Total {totalCart}€</span>
        {userInfo.shoppingBag ? (
          userInfo.shoppingBag.length > 0 ? (
            <div className="flex flex-col content-center shrink-0">
              <ul className="flex flex-col gap-2 w-[100%]">
                {userInfo.shoppingBag.map((cartItem) => (
                  <li key={cartItem._id}>
                    <CartSummaryItem item={cartItem} />
                  </li>
                ))}
              </ul>
              <button className="btn-primary" onClick={hanldeCheckout}>
                Confirm order
              </button>
            </div>
          ) : null
        ) : null}
      </div>
    </>
  );
};

export default CartSummary;

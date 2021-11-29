import React, { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../Navbar";

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
      {totalCart}
      <button onClick={hanldeCheckout}>Confirm order</button>
    </>
  );
};

export default CartSummary;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactLoading from "react-loading";

import CartSummaryItem from "../cart/CartSummaryItem.js";
import Navbar from "../Navbar.js";

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
              tempTotalCart += Math.floor(
                cartItem.price - (cartItem.price / 100) * cartItem.sale
              );
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
          <div className="flex gap-5 p-6 w-[100%] min-h-screen">
            <div className="flex flex-col gap-5 w-[100%]">
              <h3 className="font-bold text-4xl">Your cart</h3>
              {totalCart ? (
                <h3 className="font-bold">Total: {totalCart}€</h3>
              ) : null}
              {userInfo.shoppingBag ? (
                userInfo.shoppingBag.length > 0 ? (
                  <button
                    className="btn-warning w-fit-content"
                    onClick={handleEmptyCart}
                  >
                    Empty cart
                  </button>
                ) : null
              ) : null}

              {userInfo.shoppingBag ? (
                userInfo.shoppingBag.length > 0 ? (
                  <div className="flex flex-col gap-4 content-center shrink-0">
                    <ul className="flex flex-col gap-2 w-[100%]">
                      {userInfo.shoppingBag.map((cartItem) => (
                        <li key={cartItem.item}>
                          <CartSummaryItem
                            quantity={cartItem.quantity}
                            history={history}
                            itemID={cartItem.item}
                          />
                        </li>
                      ))}
                    </ul>
                    <button
                      className="btn-primary  w-fit-content self-center"
                      onClick={() => history.push("/checkout")}
                    >
                      Go to checkout
                    </button>
                  </div>
                ) : (
                  <span className="text-center">Your cart is empty</span>
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

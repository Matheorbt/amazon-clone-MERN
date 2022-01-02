import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import ReactLoading from "react-loading";

import Navbar from "../Navbar";

const OrderConfirmation = ({ history }) => {
  const { orderID } = useParams();

  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState([""]);

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
      } catch (error) {
        setError("Error while trying to retrieve user infos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    getCurrentUser();
  }, [history, setLoading, userInfo.shoppingBag]);

  return (
    <>
      <Navbar />
      {error}
      {loading ? (
        <div className="w-[100%] flex items-center justify-center min-h-screen">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <div className="flex justify-center items-start min-h-screen font-bold">
          <span>Merci pour votre commande n°{orderID}</span>
        </div>
      )}
    </>
  );
};

export default OrderConfirmation;

import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import Navbar from "../Navbar";
import PreviousOrderItem from "./PreviousOrderItem";

const PreviousOrder = ({ history }) => {
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState([""]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let previousOrders = [];
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
  }, [history, loading]);

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
              <h3 className="font-bold">Your previous order</h3>
              {userInfo.previousOrder ? (
                userInfo.previousOrder.length === 0 ? (
                  <p>You haven't ordered anything yet</p>
                ) : null
              ) : null}

              {userInfo.previousOrder ? (
                userInfo.previousOrder.length > 0 ? (
                  <div className="flex flex-col content-center shrink-0">
                    <ul className="flex flex-col gap-2 w-[100%]"></ul>
                  </div>
                ) : null
              ) : null}
              <ul>
                {userInfo.previousOrder
                  ? Object.keys(userInfo.previousOrder).map(function (
                      key,
                      index
                    ) {
                      <PreviousOrderItem
                        itemID={userInfo.previousOrder[key].Item.toString()}
                      />;
                    })
                  : null}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PreviousOrder;

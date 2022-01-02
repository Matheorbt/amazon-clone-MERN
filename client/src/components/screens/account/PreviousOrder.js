import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

import PreviousOrderItem from "./PreviousOrderItem";
import Navbar from "../Navbar";

const PreviousOrder = ({ history }) => {
  const [error, setError] = useState("");

  const [userInfo, setUserInfo] = useState([""]);

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
      {error}
      {loading ? (
        <div className="w-[100%] flex items-center justify-center">
          <ReactLoading type="bubbles" color="#232F3F" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="flex gap-5 divide-x divide-black p-3 w-[100%] min-h-screen">
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

              {userInfo.previousOrder
                ? userInfo.previousOrder.map((item) => (
                    <ul className="flex flex-col items-start justify-between gap-8 shadow-md p-8 rounded-lg bg-white cursor-pointer flex-grow transition-shadow m-3 hover:shadow">
                      <span className="font-bold">
                        Date de commande{" "}
                        {item.Date.split("-")[2].split("T")[0] +
                          "/" +
                          item.Date.split("-")[1] +
                          "/" +
                          item.Date.split("-")[0]}
                      </span>
                      <span>
                        Order ID: <span className="font-bold">{item._id}</span>
                      </span>
                      {item.Item.length > 1 ? (
                        item.Item.map((item) => (
                          <li>
                            <PreviousOrderItem
                              history={history}
                              itemID={item.item}
                              quantity={item.quantity}
                            />
                          </li>
                        ))
                      ) : (
                        <li>
                          <PreviousOrderItem
                            history={history}
                            itemID={item.item[0]}
                            quantity={item.quantity}
                          />
                        </li>
                      )}
                    </ul>
                  ))
                : null}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PreviousOrder;

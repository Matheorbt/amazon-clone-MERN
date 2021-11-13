import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

import Navbar from "./Navbar";

const HomePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    const fetchPrivateData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };
      try {
        const { data } = await axios.get("/api/private", config);
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
    fetchPrivateData();

    const handleCurrentUserIdFetching = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/fetchUserData/homepage", config);
        const userInfosRaw = JSON.stringify(data.data);
        const userInfos = JSON.parse(userInfosRaw);
        setUsername(userInfos.username);
      } catch (error) {
        setError("Error while trying to retrieve user id");
      }
    };
    handleCurrentUserIdFetching();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };
  return (
    <>
      <Navbar />
      {error ? error : "no error"}
      <br />
      {privateData}
      <br />
      Current user infos: {username}
      <br />
      <button onClick={() => logoutHandler()}>Log out</button>
    </>
  );
};

export default HomePage;

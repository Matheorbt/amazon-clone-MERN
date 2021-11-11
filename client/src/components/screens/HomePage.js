import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const HomePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [usernames, setUsernames] = useState([""]);

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

    const fetchUserUsername = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/fetchUserData/homepage", config);
        // setUsernames(data.data);
        for (let i = 0; i < data.data.length; i++) {
          setUsernames((usernames) => [...usernames, data.data[i].username]);
        }
      } catch (error) {
        setError("Error while trying to retrieve usernames");
      }
    };
    fetchUserUsername();
  }, [history]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };
  return (
    <>
      {error}
      <br />
      {privateData}
      <br />
      {usernames}
      <br />
      <button onClick={() => logoutHandler()}>Log out</button>
    </>
  );
};

export default HomePage;

import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";

const HomePage = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [usernames, setUsernames] = useState([""]);
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
  }, [history]);

  const handleUsernameFetching = async (e) => {
    e.preventDefault();
    setUsernames([""]);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.post(
        "/api/fetchUserData/homepage",
        {
          username,
        },
        config
      );
      for (let i = 0; i < data.data.length; i++) {
        setUsernames((usernames) => [...usernames, " " + data.data[i]._id]);
      }
    } catch (error) {
      setError("Error while trying to retrieve usernames");
    }
  };

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
      Requested user id: {usernames}
      <br />
      <form onSubmit={handleUsernameFetching}>
        <input
          type="text"
          required
          id="username"
          placeholder="Enter username"
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          tabIndex={1}
        />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => logoutHandler()}>Log out</button>
    </>
  );
};

export default HomePage;

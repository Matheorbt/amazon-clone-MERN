import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import logo from "../../assets/logo/Amazon-logo_white.svg";

const Navbar = ({ history }) => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [streetName, setStreetName] = useState("");
  const [streetIndex, setStreetIndex] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [userInfo, setUserInfo] = useState([""]);

  const tags = [
    "Tous",
    "Santé, nutrition",
    "Immobilier",
    "Mode",
    "Courses",
    "Cosmétiques",
    "Electronique",
  ];

  const user = {
    username: "matheorbt",
    firstName: "Mathéo",
    lastName: "Robert",
    deliveryAdress: {
      city: "Lyon",
      zipCode: "69007",
      streetName: "Salomon Reinach",
      streetIndex: "33",
      country: "France",
    },
  };

  useEffect(() => {
    const handleCurrentUserIdFetching = async () => {
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
      } catch (error) {
        setError("Error while trying to retrieve user infos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    handleCurrentUserIdFetching();
  }, [history]);

  document.addEventListener("click", (e) => {
    const isDropdownButton = e.target.matches("[data-dropdown-button]");

    if (!isDropdownButton && e.target.closest("[data-dropdown") != null) return;

    let currentDropdown;

    if (isDropdownButton) {
      currentDropdown = e.target.closest("[data-dropdown");
      currentDropdown.classList.toggle("active");
    }

    document.querySelectorAll("[data-dropdown].active").forEach((dropdown) => {
      if (dropdown === currentDropdown) return;
      dropdown.classList.remove("active");
    });
  });
  return (
    <>
      <nav className="flex flex-col">
        <div className="bg-secondary-blue w-screen flex justify-evenly items-center gap-8 p-5">
          <img src={logo} alt="logo" className="min-w-[90px] w-[5%]" />
          <h3 className="text-medium text-white">
            Livrer au{" "}
            <span className="font-bold">
              {user.deliveryAdress.streetIndex +
                " " +
                user.deliveryAdress.streetName}
            </span>{" "}
            <br /> à{" "}
            <span className="font-bold">
              {user.deliveryAdress.city + " " + user.deliveryAdress.zipCode}
            </span>
          </h3>
          <div className="flex flex-grow">
            <div className="bg-white shadow-md rounded-lg w-[100%] flex justify-around h-12">
              <select
                name="tag dropdown"
                id="tag-research"
                className="bg-[#DADADA] rounded-l-md px-3 flex-shrink"
              >
                <option value="default">Chercher par tag</option>
                <option>Test</option>
              </select>
              <input type="text" className=" flex-grow" />
              <button className="bg-secondary-orange h-[100%] rounded-r-md px-3 flex-shrink">
                Rechercher
              </button>
            </div>
          </div>
          <div className="flex gap-2 flex-shrink relative items-start">
            <div>
              <h3 className="text-medium text-white">
                Bonjour {userInfo["firstName"]} <br />{" "}
              </h3>
              <div className="dropdown" data-dropdown>
                <button
                  className="link opacity-[1] text-white"
                  data-dropdown-button
                >
                  Compte et listes
                </button>
                <div className="dropdown-menu z-20">
                  <a className="text-black" href="/">
                    dropdown Content
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white absolute p-12 top-[50px] invisible group-hover:visible">
              <ul>
                <li>test</li>
                <li>test</li>
                <li>test</li>
                <li>test</li>
              </ul>
            </div>
            <h3 className="font-bold text-white hover:opacity-70 cursor-pointer transition-all">
              Panier
            </h3>
          </div>
        </div>
        <div className=" bg-main-blue w-screen flex justify-evenly items-center gap-8 p-3">
          <ul className="flex justify-around items-center flex-grow z-10">
            {tags.map((tag) => {
              return (
                <li
                  key={tag}
                  className="text-white hover:opacity-80 transition-all"
                >
                  <a href="/homepage">{tag}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

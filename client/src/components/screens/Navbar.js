import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import CartItem from "./cart/CartItem";

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

  const [loading, setLoading] = useState(true);

  const [dropdownToggled, setDropdownToggled] = useState(false);
  const [dropdownCartToggled, setDropdownCartToggled] = useState(false);

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
        setLoading(false);
      } catch (error) {
        setError("Error while trying to retrieve user infos");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    handleCurrentUserIdFetching();
  }, [history, loading]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };

  return (
    <>
      <nav className="flex flex-col">
        <div className="bg-secondary-blue w-screen flex justify-evenly items-center gap-8 p-5">
          <span className="min-w-[90px] w-[5%]">
            <Link to="/homepage" className="flex-shrink">
              <img src={logo} alt="logo" />
            </Link>
          </span>
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
              <div className="dropdown">
                <button
                  className="link opacity-[1] text-white  font-bold"
                  onClick={() => setDropdownToggled(!dropdownToggled)}
                >
                  Compte et listes
                </button>
                <div
                  className={
                    dropdownToggled
                      ? "dropdown-menu z-20"
                      : "dropdown-menu z-20 hidden"
                  }
                >
                  <div className="flex gap-5 divide-x divide-black p-3">
                    <div className="flex-col gap-2 p-3">
                      <h3 className="font-bold">Votre compte</h3>
                      <ul className="flex-col gap-2">
                        <li>
                          <a
                            href="/homepage"
                            className="hover:opacity-50 transition-opacity"
                          >
                            Vos informations
                          </a>
                        </li>
                        <li>
                          <a
                            href="/homepage"
                            className="hover:opacity-50 transition-opacity"
                          >
                            Vos commandes
                          </a>
                        </li>
                        <li>
                          <a
                            href="/homepage"
                            className="hover:opacity-50 transition-opacity"
                          >
                            Votre liste d'envie
                          </a>
                        </li>
                        <li className="text-warning">
                          <button onClick={() => logoutHandler()}>
                            Déconnexion
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-col w-fit-content p-3">
                      <h3 className="font-bold">Votre listes d'envies</h3>
                      <ul className="w-fit-content">
                        <li>(Nom des listes d'envies du user)</li>
                      </ul>
                    </div>
                    <div className="flex-col p-3">
                      <h3 className="font-bold">Acheter à nouveau</h3>
                      <ul>
                        <li>(Liste des 5 derniers commandes)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="link opacity-[1] text-white font-bold"
                onClick={() => setDropdownCartToggled(!dropdownCartToggled)}
              >
                Panier
              </button>
              <div
                className={
                  dropdownCartToggled
                    ? "dropdown-menu z-20"
                    : "dropdown-menu z-20 hidden"
                }
              >
                <div className="flex gap-5 divide-x divide-black p-3">
                  <div className="flex-col gap-2 p-3">
                    <h3 className="font-bold">Votre panier</h3>
                    {user["shoppingBag"] ? (
                      <ul className="flex-col gap-2">
                        {userInfo["shoppingBag"].map((cartItem) => (
                          <li key={cartItem}>
                            <CartItem item={cartItem} />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span>Votre panier est vide</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
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

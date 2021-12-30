import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

import CartItem from "./cart/CartItem";

import { getTotalCart } from "../../utils/getTotalCart.js";

import logo from "../../assets/logo/Amazon-logo_white.svg";

const Navbar = ({ history }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const [error, setError] = useState("");

  const [searchTitle, setSearchTitle] = useState("");

  const [userInfo, setUserInfo] = useState([""]);
  const [itemsList, setItemsList] = useState([""]);

  const [totalCart, setTotalCart] = useState(0);
  const [totalItemCart, setTotalItemCart] = useState(0);

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

  useEffect(() => {
    let tempTotalCart = 0;
    let tempTotalItemCart = 0;

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
    const fetchItemList = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data } = await axios.get("/api/items/list", config);
        const itemListRaw = JSON.stringify(data);
        const itemList = JSON.parse(itemListRaw);
        setItemsList(itemList.itemsList);
        setLoading(false);
      } catch (error) {
        setError("Error while trying to retrieve items");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    fetchItemList();
    getCurrentUser();
    userInfo.shoppingBag
      ? (tempTotalCart = getTotalCart(userInfo.shoppingBag))
      : (tempTotalItemCart = 0);
    setTotalCart(tempTotalCart > 0 ? tempTotalCart : 0);
    setTotalItemCart(tempTotalItemCart);
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
      this.forceUpdate();
    } catch (error) {
      setError("Error while trying to clear the cart");
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };

  return (
    <>
      <nav className="flex flex-col">
        <div className="bg-secondary-blue max-w-screen flex justify-evenly items-center gap-8 p-5">
          <span className="min-w-[90px] w-[5%]">
            <Link to="/homepage" className="flex-shrink">
              <img src={logo} alt="logo" />
            </Link>
          </span>
          <h3 className="text-medium text-white hidden lg:block">
            Deliver to{" "}
            <span className="font-bold">
              {userInfo.deliveryInformation ? (
                userInfo.deliveryInformation.streetIndex
              ) : (
                <span>Loading...</span>
              )}{" "}
              {userInfo.deliveryInformation ? (
                userInfo.deliveryInformation.streetName
              ) : (
                <span>Loading...</span>
              )}
            </span>{" "}
            <br /> at{" "}
            <span className="font-bold">
              {userInfo.deliveryInformation ? (
                userInfo.deliveryInformation.city
              ) : (
                <span>Loading...</span>
              )}{" "}
              {""}
              {userInfo.deliveryInformation ? (
                userInfo.deliveryInformation.zipCode
              ) : (
                <span>Loading...</span>
              )}
            </span>
          </h3>
          <div className="flex flex-grow">
            <div className="relative w-full">
              <div className="bg-white shadow-md rounded-lg w-[100%] hidden h-12 lg:flex justify-around">
                <select
                  name="tag dropdown"
                  id="tag-research"
                  className="bg-[#DADADA] rounded-l-md px-3 flex-shrink"
                >
                  <option value="default">Chercher par tag</option>
                  <option>Test</option>
                </select>
                <input
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  type="text"
                  className="flex-grow px-3"
                />
                <button className="bg-secondary-orange h-[100%] rounded-r-md px-3 flex-shrink">
                  Search
                </button>
              </div>
              {searchTitle ? (
                <div className="flex flex-col dropdown-menu absolute mt-1 z-50 bg-white w-full rounded-lg p-4">
                  {itemsList.filter((value) =>
                    value.title
                      .toLowerCase()
                      .includes(searchTitle.toLowerCase())
                  ).length > 0 ? (
                    itemsList
                      .filter((value) =>
                        value.title
                          .toLowerCase()
                          .includes(searchTitle.toLowerCase())
                      )
                      .map((item) => (
                        <Link
                          className="w-full p-2 rounded-lg transition-colors hover:bg-gray-300"
                          to={"/item/" + item._id}
                        >
                          {item.title}
                        </Link>
                      ))
                  ) : (
                    <span>No item found</span>
                  )}
                </div>
              ) : (
                <div className="absolute mt-2 z-50 bg-white w-full rounded-lg p-4 hiddenDropdown">
                  {searchTitle}
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-2 flex-shrink relative items-start">
            <div>
              <h3 className="text-medium text-white">
                Hello {userInfo.firstName} <br />{" "}
              </h3>
              <div className="dropdown">
                <button
                  className="link opacity-[1] text-white  font-bold"
                  onClick={() => setDropdownToggled(!dropdownToggled)}
                >
                  Account and lists
                </button>
                <div
                  className={
                    dropdownToggled
                      ? "dropdown-menu z-20"
                      : "dropdown-menu z-20 hiddenDropdown"
                  }
                >
                  <div className="flex-col gap-5 min-w-[150px] p-3 lg:flex lg:flex-row ">
                    <div className="flex-col gap-2 p-3">
                      <h3 className="font-bold text-lg">Your account</h3>
                      <ul className="flex-col gap-2">
                        <li>
                          <a
                            href="/account/personnalinformation"
                            className="hover:opacity-70 transition-opacity text-base"
                            onClick={() => setDropdownToggled(!dropdownToggled)}
                          >
                            Your informations
                          </a>
                        </li>
                        <li>
                          <a
                            href="/account/orders"
                            className="hover:opacity-70 transition-opacity"
                            onClick={() => setDropdownToggled(!dropdownToggled)}
                          >
                            Your orders
                          </a>
                        </li>
                        <li>
                          <a
                            href="/homepage"
                            className="hover:opacity-70 transition-opacity"
                            onClick={() => setDropdownToggled(!dropdownToggled)}
                          >
                            Your wish list
                          </a>
                        </li>
                        <li className="text-warning">
                          <button onClick={() => logoutHandler()}>
                            Déconnexion
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-col min-w-[150px] p-3">
                      <h3 className="font-bold text-lg">Your wish list</h3>
                      <ul className="w-fit-content">
                        <li>(Nom des listes d'envies du user)</li>
                      </ul>
                    </div>
                    <div className="flex-col min-w-[150px] p-3 ">
                      <h3 className="font-bold  text-lg">Buy again</h3>
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
                className="link opacity-[1] text-white font-bold relative"
                onClick={() => setDropdownCartToggled(!dropdownCartToggled)}
              >
                <span className="text-main-blue absolute left-4 top-[0.15rem]">
                  {userInfo.shoppingBag ? totalItemCart : 0}
                </span>
                <i
                  className="fa fa-shopping-cart text-[36px]"
                  aria-hidden="true"
                ></i>
              </button>
              <div
                className={
                  dropdownCartToggled
                    ? "dropdown-menu z-20"
                    : "dropdown-menu z-20 hiddenDropdown"
                }
              >
                <div className="flex gap-5 divide-black p-3">
                  <div className="flex-col min-w-[200px] gap-2 p-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">Your cart</h3>
                      <h3 className="font-bold text-md">Total: {totalCart}€</h3>
                    </div>
                    <hr className="my-4" />
                    <div className="flex flex-col">
                      {userInfo.shoppingBag ? (
                        userInfo.shoppingBag.length > 0 ? (
                          <Link
                            to="/cart"
                            onClick={() =>
                              setDropdownCartToggled(!dropdownCartToggled)
                            }
                          >
                            <span className="font-semibold">
                              Access your cart
                            </span>
                          </Link>
                        ) : null
                      ) : null}
                      {totalCart ? <h3>Total: {totalCart}</h3> : null}
                      {userInfo.shoppingBag ? (
                        userInfo.shoppingBag.length > 0 ? (
                          <button
                            className="text-warning font-semibold w-fit-content"
                            onClick={handleEmptyCart}
                          >
                            Empty cart
                          </button>
                        ) : null
                      ) : null}
                    </div>
                    {userInfo.shoppingBag ? (
                      userInfo.shoppingBag.length > 0 ? (
                        <ul className="flex flex-col gap-2 overflow-y-scroll max-h-[21rem]">
                          {userInfo.shoppingBag.map((cartItem) => (
                            <li key={cartItem.item}>
                              <CartItem
                                quantity={cartItem.quantity}
                                history={history}
                                itemID={cartItem.item}
                              />
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-warning font-semibold">
                          Your cart is empty
                        </span>
                      )
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

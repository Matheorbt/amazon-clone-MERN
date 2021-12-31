import axios from "axios";

const getTotalCart = async ({ shoppingBag }) => {
  let totalCart = 0;
  //   shoppingBag.length > 1
  //     ? shoppingBag.map((item) => (totalCart += getItemTotal(item)))
  //     : getItemTotal(shoppingBag[0]);
  return totalCart;
};

const getItemTotal = async ({ cartItem }) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  try {
    const { data } = await axios.get(
      "/api/items/fetchitembyid/" + cartItem.item,
      config
    );
    return data.item.price * cartItem.quantity;
  } catch (error) {
    return error;
  }
};

export { getTotalCart };

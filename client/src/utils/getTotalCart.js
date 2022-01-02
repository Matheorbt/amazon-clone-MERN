import axios from "axios";

const getTotalCart = (shoppingBag) => {
  let totalCart = 0;

  if (shoppingBag.length > 1) {
    shoppingBag.map((item) =>
      getItemTotal(item).then((value) => {
        return value;
      })
    );
  } else {
    totalCart = getItemTotal(shoppingBag[0]).then((value) => {
      return value;
    });
  }

  return totalCart;
};

const getItemTotal = async (cartItem) => {
  let itemPrice = 0;

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
    itemPrice =
      (data.item.price - (data.item.sale * data.item.price) / 100) *
      cartItem.quantity;
  } catch (error) {
    itemPrice = 0;
  }
  return itemPrice;
};

export { getTotalCart };

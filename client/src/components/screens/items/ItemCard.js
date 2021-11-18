import React from "react";

const ItemCard = ({ item }) => {
  const {
    title,
    description,
    thumbnail,
    price,
    sale,
    quantityleft,
    rating,
    sold,
    images,
    tags,
  } = { ...item };
  return (
    <>
      <div className="card-container">
        <img src={thumbnail} alt={title} />
        <div>{title}</div>
        <hr />
        <p>Price: {price - (price / 100) * sale}</p>
        {!quantityleft ? "Out of stock" : <p>Only: {quantityleft} left !</p>}
        {/* {tags.map((tag) => (
          <p className="p-4 border-solid border-4 border-light-blue-500 rounded-lg">
            {tag}
          </p>
        ))} */}
        <br />
        {rating + "/5"}
      </div>
    </>
  );
};

export default ItemCard;

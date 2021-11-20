import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  const { title, thumbnail, price, sale, quantityleft, rating, tags, _id } = {
    ...item,
  };
  return (
    <Link to={"/item/" + _id}>
      <div className="card-container w-fit-content hover:shadow-none">
        <img src={thumbnail} alt={title} />
        <span className="font-bold">{title}</span>
        <hr />
        <p className="font-medium">Price: {price - (price / 100) * sale}€</p>
        {!quantityleft ? (
          <span className="text-warning">Out of stock</span>
        ) : (
          <p>Only: {quantityleft} left !</p>
        )}
        <ul className="flex gap-2">
          {tags
            ? tags.map((tag) => (
                <li key={tag}>
                  <p className="p-[0.2rem] border-solid border-2 border-light-blue-500 rounded-lg">
                    {tag}
                  </p>
                </li>
              ))
            : null}
        </ul>
        <br />
        {rating + "/5"}
      </div>
    </Link>
  );
};

export default ItemCard;

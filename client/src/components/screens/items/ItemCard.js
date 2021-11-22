import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item, history }) => {
  const {
    title,
    thumbnail,
    price,
    sale,
    quantityleft,
    rating,
    tags,
    _id,
    description,
  } = {
    ...item,
  };
  var trimmedDescription = description.substr(0, 100);
  trimmedDescription = trimmedDescription.substr(
    0,
    Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))
  );

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);
  return (
    <Link to={"/item/" + _id}>
      <div className="flex card-container w-fit-content hover:shadow-none gap-3">
        <img src={thumbnail} alt={title} />
        <span className="font-bold">{title}</span>
        <p className="italic">{trimmedDescription}...</p>
        <p className="font-medium">
          {price - (price / 100) * sale}€{" "}
          {sale ? <span className="italic opacity-60">-{sale}%</span> : null}
        </p>
        {!quantityleft ? (
          <span className="text-warning font-bold">Out of stock</span>
        ) : (
          <p>Only: {quantityleft} left !</p>
        )}
        <ul className="flex gap-2">
          {tags
            ? tags.map((tag) => (
                <li key={tag}>
                  <span className="p-[0.5rem] rounded-lg shadow-lg">{tag}</span>
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

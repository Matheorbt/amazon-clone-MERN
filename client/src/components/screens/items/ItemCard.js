import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item, history }) => {
  const {
    title,
    thumbnail,
    price,
    sale,
    quantityLeft,
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
      <div className="flex justify-around max-w-sm h-full card-container transition-shadow hover:shadow gap-3">
        <img
          className="w-[30%] min-w-[150px] self-center"
          src={thumbnail}
          alt={title}
        />
        <span className="font-bold">{title}</span>
        <p className="italic">{trimmedDescription}...</p>
        <p className="font-medium">
          {Math.floor(price - (price / 100) * sale)}€{" "}
          {sale ? <span className="italic opacity-60">-{sale}%</span> : null}
        </p>
        {!quantityLeft ? (
          <span className="text-warning font-bold">Out of stock</span>
        ) : (
          <p>Only: {quantityLeft} left !</p>
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
      </div>
    </Link>
  );
};

export default ItemCard;

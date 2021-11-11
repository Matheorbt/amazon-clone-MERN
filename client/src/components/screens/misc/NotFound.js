import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <h1>404 page not found</h1>
      <Link to="/homepage">Accueil</Link>
    </>
  );
};

export default NotFound;

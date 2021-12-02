import React from "react";
import { Link, useLocation } from "react-router-dom";

import logo from "../../assets/logo/Amazon-logo_white.svg";

const Footer = ({ history }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    console.clear();
    history.push("/login");
  };

  return (
    <>
      {pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgotpassword" ||
      pathname === "/landing" ||
      pathname === "/" ||
      pathname === "/resetpassword" ? null : (
        <footer className="flex flex-col">
          <button
            className="w-[100%] text-white bg-tercary-blue py-4"
            onClick={() => window.scrollTo(0, 0)}
          >
            Scroll to top
          </button>
          <section className="bg-main-blue flex flex-col content-center items-center gap-4">
            <div className="flex flex-col lg:flex-row justify-between w-[100%] px-8 my-4">
              <div className="flex flex-col gap-4">
                <h1 className="font-semibold text-white">
                  Pour mieux nous connaître
                </h1>
                <ul className="text-white-container">
                  <li className="text-white">
                    <a href={"/"}>Durabilité</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-white">Gagnez de l'argent</h1>
                <ul className="text-white-container">
                  <li className="text-white">
                    <a href={"/"}>Vendez sur Amazon</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col">
                <h1 className="font-semibold text-white">
                  Moyens de paiement Amazon
                </h1>
                <ul className="text-white-container">
                  <li className="text-white">
                    <a href={"/"}>Cartes de paiement</a>
                  </li>
                </ul>
              </div>
              <div className="column">
                <h1 className="font-semibold text-white">Besoin d'aide ?</h1>
                <ul className="text-white-container">
                  <li className="text-white">
                    <a href={"/"}>Amazon et COVID-19</a>
                  </li>
                </ul>
              </div>
            </div>
            <section className="flex flex-col content-center items-center gap-4 my-4">
              <img
                src={logo}
                alt="temporary"
                className="max-w-lg w-[30%] min-w-[250px]"
              />
              <ul className="flex flex-col lg:flex-row gap-2 text-white">
                <li className="language">Australie</li>
                <li className="language">Allemagne</li>
                <li className="language">Brésil</li>
                <li className="language">Canada</li>
                <li className="language">Chine</li>
                <li className="language">Espagne</li>
                <li className="language">Etats-Unis</li>
                <li className="language">Inde</li>
                <li className="language">italie</li>
                <li className="language">Japon</li>
                <li className="language">Mexique</li>
                <li className="language">Pays-Bas</li>
                <li className="language">Pologne</li>
                <li className="language">Royaume-Uni</li>
                <li className="language">Emirates-Uni</li>
                <li className="language">Emirats arabes unis</li>
                <li className="language">Singapour</li>
                <li className="language">Turquie</li>
              </ul>
            </section>
          </section>
          <section className="bg-secondary-blue flex flex-col">
            <div className="flex flex-col m-20 lg:flex-row">
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Amazon Music</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Écoutez des millions de chansons
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">AbeBooks</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Livres, art & articles de collection
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Amazon Web Services</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Services de Cloud Computing Flexibles
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Audible</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Livres audio télécharger
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Book Depository</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Livres expédiés dans le monde entier
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Kindle Direct Publishing</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Auto-publiez facilement vos livres au format numérique
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Offres</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Bonnes affaires
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Shopbop</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Vêtements de Marque & Mode
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Amazon Advertising</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Ciblez, attirez et fidélisez vos clients
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Amazon Business</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Paiement 30 jours. Hors TVA. Pour les professionnels.
                </a>
              </div>
              <div className="flex flex-col">
                <h2 className="text-white text-sm">Amazon Second Chance</h2>
                <a className="text-white opacity-70 text-sm" href={"/"}>
                  Transmettez, échangez, donnez une seconde vie à vos objets
                </a>
              </div>
            </div>
            <div className="flex flex-col items-center mb-2">
              <a className="text-white" href={"/"}>
                Conditions générales de vente
              </a>
              <p className="text-white">
                © 1996-{new Date().getFullYear()}, Amazon.com, Inc. ou ses
                filiales.
              </p>
            </div>
          </section>
        </footer>
      )}
    </>
  );
};

export default Footer;

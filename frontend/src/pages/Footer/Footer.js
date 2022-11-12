import React from "react";
import { FiFacebook } from "react-icons/fi";
import { AiOutlineInstagram } from "react-icons/ai";
import { Input, Stack } from "@chakra-ui/react";
import "./footercss.css";
import { Link, NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footerCmp">
      <footer>
        <div className="footerCategorie">
          <h1>Categories</h1>
          <ul>
            <li>
              <Link to="/shop/?cg=Meuble">Meuble</Link>
            </li>
            <li>
              <Link to="/shop/?cg=Decoration">Decoration</Link>
            </li>
            <li>
              <Link to="/shop/?cg=Accessoires">Accessoires</Link>
            </li>
          </ul>
        </div>
        <div className="footerGetInTouch">
          <h1>CONTACT</h1>
          <ul>
            <p>
              Des questions? Faites-le nous savoir en Boutique au{" "}
              <a href="http://www.google.com/maps/place/33.857212,10.085276">
                {" "}
                Chemati, Route Matmata Km 2, Gabès, Tunisie{" "}
              </a>{" "}
              ou appelez-nous au (+216) 51 609 064 / +(216)75 212 712
            </p>
            <li className="footerIcons">
              <a href="https://www.facebook.com/Ardust.tn">
                <FiFacebook size="25" />
              </a>
            </li>
            <li className="footerIcons">
              <a href="https://www.instagram.com/ardust_tn/">
                <AiOutlineInstagram size="25" />
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h1>LIENS UTILES</h1>
          <ul>
            <NavLink
              to="/"
              /*exact*/ activeclassname="activlink"
              onClick={null}
            >
              <li>Accueil</li>
            </NavLink>
            <NavLink to="/shop" activeclassname="activlink" onClick={null}>
              <li>Boutique</li>
            </NavLink>
            <NavLink to="/contactus" activeclassname="activlink" onClick={null}>
              <li>Contact</li>
            </NavLink>
            <NavLink to="/about" activeclassname="activlink" onClick={null}>
              <li>À propos</li>
            </NavLink>
            <NavLink to="/delivery" activeclassname="activlink" onClick={null}>
              <li>Livraison</li>
            </NavLink>
          </ul>
        </div>
      </footer>
      <div
        style={{
          width: "100%",
          paddingBottom: 30,
          backgroundColor: "#252525",
          color: "#FFFFFF99",
          fontWeight: 500,
        }}
      >
        <center>
          <div className="paragraphFooter">
            <a href="https://www.ovc.tn/">
              © 2022 - Logiciel e-commerce par OVC
            </a>
          </div>
          <div className="paragraphFooter">
            <a href="https://www.facebook.com/e3cagency">
              © Website made by E3C 2022
            </a>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Footer;

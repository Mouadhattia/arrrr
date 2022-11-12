import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route } from "react-router-dom";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

import { HashLink } from "react-router-hash-link";
import { logout } from "../actions/userActions";
import { keyword } from "color-convert";
import Searchnav from "./Searchnav";

const Nav = () => {
  const [incart, setincart] = useState(0);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const [nav, setNav] = useState(false);
  const Nav = useRef(null);
  const [burgActive, setBurgActive] = useState(false);
  //search
  const searchRef = useRef(null);
  const [showSearchIc, setShowSearchIc] = useState(false);
  //Burger
  const Buric = useRef(null);
  const navLinks = useRef(null);
  const rightItems = useRef(null);
  //signin
  const [signin, setSignin] = useState(null);

  const navigate = useNavigate();

  const onSeacrhFun = () => {
    //Search Icon state + Bar
    setShowSearchIc(!showSearchIc); //false
    console.log(showSearchIc);
    searchRef.current.classList.toggle("searchActive");
    searchRef.current.style.animation = "moving 0.3s ease both 0.3s";
  };
  const onDelSeacrh = () => {
    setShowSearchIc(!showSearchIc); //true
    searchRef.current.classList.toggle("searchActive");
  };

  const onBurgActive = () => {
    //Toggle Nav
    const links = document.querySelectorAll(".navLinks li");
    navLinks.current.classList.toggle("burgerActive");
    rightItems.current.classList.toggle("burgerActive");
    //Animate Links
    links.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
        rightItems.current.style.animation = "";
      } else {
        link.style.animation = `moving 0.5s ease forwards ${index / 5}s`;
        rightItems.current.style.animation = `moving 0.5s ease forwards ${
          index / 5
        }s`;
      }
    });
    //Burger Animation
    Buric.current.classList.toggle("toggle");
    setBurgActive(!burgActive);
  };
  const onChangeBack = () => {
    if (window.scrollY >= 60) {
      setNav(true);
    } else setNav(false);
  };
  window.addEventListener("scroll", onChangeBack);

  useEffect(() => {
    const cart = cartItems.length ? cartItems.length : 0;
    setincart(cart);
    return () => {
      setincart(0);
    };
  }, [cart]);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };
  const makeLinkProps = (to) => {
    return {
      onClick: (e) => {
        try {
          navigate(to);
          onBurgActive();
        } catch (e) {
          console.log({ e });
        }
      },
    };
  };
  return (
    <nav ref={Nav} className={`nav active`}>
      {/* Logo */}
      <div className="logo">
        <Link
          onClick={() => {
            if (burgActive) onBurgActive();
            navigate("");
          }}
        >
          <img
            style={{ height: 30, width: 100 }}
            src="https://i.ibb.co/x5czhPY/ARDUST-03-4.png"
          />
        </Link>
      </div>

      {/* nav links */}
      {!showSearchIc ? (
        <ul className="navLinks" ref={navLinks}>
          <NavLink
            to="/shop"
            activeclassname="activlink"
            onClick={onBurgActive}
          >
            <li>Boutique</li>
          </NavLink>
          <NavLink
            to="/contactus"
            activeclassname="activlink"
            onClick={onBurgActive}
          >
            <li>Contact</li>
          </NavLink>
          <NavLink
            to="/about"
            activeclassname="activlink"
            onClick={onBurgActive}
          >
            <li>À propos</li>
          </NavLink>
        </ul>
      ) : (
        <div></div>
      )}
      {/* the open close button */}
      <div className="burger" ref={Buric} onClick={onBurgActive}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
      <div className="rightComp" ref={rightItems}>
        {/* card icon */}
        <Link onClick={onBurgActive} to="/cart">
          {" "}
          <RiShoppingCart2Line className="iconCart" size="35" />
          {userInfo && !userInfo.isAdmin && (
            <div className="dotcart">{incart}</div>
          )}
        </Link>
        {/* Profile or login */}
        {userInfo ? (
          <div className="ic_sett_dis">
            <Link to="/profile">
              <CgProfile size="25" className="settingIcon" />
            </Link>
            <IoMdLogOut
              size="28"
              className="displayIcon"
              onClick={logoutHandler}
            />
          </div>
        ) : (
          <Link onClick={onBurgActive} to="/login">
            {" "}
            <div
              className="signin"
              onMouseOver={() => setSignin(!signin)}
              onMouseOut={() => setSignin(!signin)}
            >
              S'identifier
            </div>
          </Link>
        )}
        {/* admin drop down menu  */}
        {userInfo && userInfo.isAdmin && (
          <div className="menu-admin">
            <Menu>
              <MenuButton as={Button} rightIcon={<IoMdArrowDropdown />}>
                Administrateur
              </MenuButton>
              <MenuList onClick={(e) => {}}>
                <MenuItem {...makeLinkProps("/admin/userlist")}>
                  <div>Utilisateurs</div>
                </MenuItem>
                <MenuItem {...makeLinkProps("/admin/productlist")}>
                  <div>Produits</div>
                </MenuItem>
                <MenuItem {...makeLinkProps("/admin/orderlist")}>
                  <div>commandes</div>
                </MenuItem>

                {/*
                                 <MenuItem>
                                 <div {...makeLinkProps('/admin/discounts')}>
                                     Promo
                                 </div>
                             </MenuItem>
                                */}
              </MenuList>
            </Menu>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Nav;

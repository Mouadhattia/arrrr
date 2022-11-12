import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardProduct from "./CardProduct";
import {
  listProducts,
  ListproductbyCg,
  Listproductbyfiter,
  Listproductbyprice,
} from "../actions/productActions";
import { BsFilter } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { ImCross } from "react-icons/im";
import Search from "./Search";
import {
  NumberInput,
  NumberInputField,
  FormLabel,
  Button,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import HashLoader from "react-spinners/HashLoader";
import { Link, Route, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

const ProductsC = ({}) => {

 
  const location = useLocation();

  function getQueryVariable(variable) {
    var query = location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]) === "undefined"
          ? undefined
          : decodeURIComponent(pair[1]);
      }
    }
    console.log("Query variable %s not found", variable);
    return null;
  }
  const [From, setFrom] = useState(0);
  const [To, setTo] = useState(0);
  let Cg = getQueryVariable("cg");
  let filter = getQueryVariable("filter");
  const keyword = decodeURI(location.pathname.split("/")[2] || "");
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const entry = useRef();
  const { loading, error, products } = productList;
  const [showfilter, setshowfilter] = useState(false);
  const [showsearch, setshowsearch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(
      listProducts(
        keyword,
        Cg,
        filter,
        !showfilter || From === To ? undefined : From,
        !showfilter || From === To ? undefined : To
      )
    );
  }, [dispatch, Cg, keyword, showfilter, From, To, filter]);

  const filterfunc = () => {
    if (showfilter) {
      dispatch(listProducts(keyword, Cg, undefined, undefined));
      setshowfilter(false);
    } else {
      dispatch(
        listProducts(
          keyword,
          Cg,
          filter,
          From === To ? undefined : From,
          From === To ? undefined : To
        )
      );
      setshowfilter(true);
    }
  };

  const searchfunc = () => {
    setshowsearch(!showsearch);
    if (showfilter) {
      setshowfilter(false);
    }
  };

  const pricehandler = () => {
    dispatch(
      listProducts(
        keyword,
        Cg,
        Cg,
        From === To ? undefined : From,
        From === To ? undefined : To
      )
    );
  };

  let filtredBy = {
    Rating: "Note",
    highprice: "Prix de bas en haut",
    lowprice: "Prix de haut en bas",
    date: "Prix de haut en bas",
  }[filter];

  const makeSearchTitle = (k) => `${"*" + k + "* Recherche"}`;
  let title = "";
  if (Cg) {
    title = `Produits de ${Cg}`;
  }
  if (keyword) {
    title = makeSearchTitle(keyword);
  }
  if (!title?.length) {
    title = "Tous les produits";
  }
  if (filtredBy?.length) {
    title += ` triés par ${filtredBy}`;
  }
  //  alert(title)
  return (
    <>
      <div className="Cgfilter" ref={entry} name="shop_entry" id="shop_entry">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {keyword?.length || filtredBy?.length ? (
            <ImCross
              onClick={() => {
                navigate("/shop");
              }}
            />
          ) : (
            <></>
          )}
          <h1>{title}</h1>
        </div>
        <div className="filtersbtn ">
          <button
            className={`filterbtn ${showfilter ? "activebtn" : ""}`}
            onClick={filterfunc}
          >
            {" "}
            {showfilter ? <IoMdClose size="20"  style={{margin:"10px 10px -4px 0"}}/> : <BsFilter style={{margin:"10px 10px -4px 0"}} size="20" />}
            Filtre
          </button>
          <button
            className={`searchbtn ${showsearch ? "activebtn" : ""}`}
            onClick={searchfunc}
          >
            {showsearch ? (
              <IoMdClose size="20" style={{margin:"10px 10px -4px 0"}} />
            ) : (
              <AiOutlineSearch size="20" style={{margin:"10px 10px -4px 0"}}/>
            )}
            Rechercher
          </button>
        </div>
        <div className="filters">
          <ul>
            <HashLink
              className="lined"
              to={
                "?cg" +
                (filter?.length ? `&filter=${filter}` : "") +
                "#shop_entry"
              }
            >
              Tous
            </HashLink>
            <HashLink
              className="lined"
              to={
                "?cg=Decoration" +
                (filter?.length ? `&filter=${filter}` : "") +
                "#shop_entry"
              }
            >
              Decoration
            </HashLink>
            <HashLink
              className="lined"
              to={
                "?cg=Meuble" +
                (filter?.length ? `&filter=${filter}` : "") +
                "#shop_entry"
              }
            >
              Meuble
            </HashLink>
            <HashLink
              className="lined"
              to={
                "?cg=Accessoires" +
                (filter?.length ? `&filter=${filter}` : "") +
                "#shop_entry"
              }
            >
              Accessoires
            </HashLink>
          </ul>
        </div>
      </div>
      {showsearch && (
       <Search  />
      )}
      <div className={`filterarea ${showfilter ? "filter" : "filteroff"}`}>
        <div className="sortbydiv">
          <h1> Trier par</h1>
          <ul>
            <HashLink
              onClick={() => setshowfilter(false)}
              className="lined"
              to={"?filter" + (Cg?.length ? `&cg=${Cg}` : "") + "#shop_entry"}
            >
              Par défaut
            </HashLink>
            <HashLink
              onClick={() => setshowfilter(false)}
              className="lined"
              to={
                "?filter=Rating" +
                (Cg?.length ? `&cg=${Cg}` : "") +
                "#shop_entry"
              }
            >
              Note
            </HashLink>
            <HashLink
              onClick={() => setshowfilter(false)}
              className="lined"
              to={
                "?filter=date" + (Cg?.length ? `&cg=${Cg}` : "") + "#shop_entry"
              }
            >
              Date
            </HashLink>
            <HashLink
              onClick={() => setshowfilter(false)}
              className="lined"
              to={
                "?filter=highprice" +
                (Cg?.length ? `&cg=${Cg}` : "") +
                "#shop_entry"
              }
            >
              Prix bas à élevé
            </HashLink>
            <HashLink
              onClick={() => setshowfilter(false)}
              className="lined"
              to={
                "?filter=lowprice" +
                (Cg?.length ? `&cg=${Cg}` : "") +
                "#shop_entry"
              }
            >
              Prix élevé à bas
            </HashLink>
          </ul>
        </div>
        <div className="pricediv">
          <h1> Prix</h1>
          <FormControl id="email">
            <Stack spacing={2}>
              <FormLabel>De :</FormLabel>
              <NumberInput
                value={From}
                bg="white"
                onChange={(e) => setFrom(e)}
                borderRadius="md"
                borderTopRadius="md"
                borderTopLeftRadius="md"
              >
                <NumberInputField />
              </NumberInput>
              <FormLabel>À :</FormLabel>
              <NumberInput
                value={To}
                bg="white"
                onChange={(e) => setTo(e)}
                borderRadius="md"
                borderTopRadius="md"
                borderTopLeftRadius="md"
              >
                <NumberInputField />
              </NumberInput>
              <Button onClick={pricehandler} type="submit" colorScheme="teal">
                Filtre
              </Button>
            </Stack>
          </FormControl>
        </div>
      </div>
      {loading ? (
        <div className="loading">
          <HashLoader color={"#fff"} loading={loading} size={40} />
        </div>
      ) : error ? (
        <h2>{error} </h2>
      ) : products.length === 0 ? (
        <h1 className="nothingfound">[Pas de produits]</h1>
      ) : (
        <div className="cardsProduct">
          {products.reverse().map((product) => (
            <CardProduct key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductsC;

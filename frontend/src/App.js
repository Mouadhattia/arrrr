import Nav from "./components/Nav";
import Home from "./pages/Home";
import About from "./pages/About/About";
import Delivery from "./pages/Delivery/Delivery";

import Shop from "./pages/Shop";
import Contactus from "./pages/Contactus/Contactus";
import Productpage from "./pages/Product/Productpage";
import Cartpage from "./pages/Cart/Cartpage";
import Footer from "./pages/Footer/Footer";
import LoginScreen from "./pages/Login/LoginScreen";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ScrollIntoView from "./components/Scrollintoview";
import HashLoader from "react-spinners/HashLoader";
import RegisterScreen from "./components/RegisterScreen";
import ProfileScreen from "./components/ProfileScreen";
import Checkout from "./pages/checkout/Checkout";
import Placeorder from "./pages/placeorder/Placeorder";
import Order from "./pages/Order/Order";
import Users from "./pages/Userslist/Users";
import NotFoundPage from "./components/Notfoundpage";
import Edituser from "./pages/Useredit/Edituser";
import Products from "./pages/products/products";
import Editproduct from "./pages/Editproduct/Editproduct";
import Orders from "./pages/Orders/Orders";
import Discounts from "./pages/Discounts/Discounts";

const App = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="main">
      <ChakraProvider>
        <Router>
          <ScrollIntoView>
            {loading ? (
              <div className="loading">
                <HashLoader color={"#1e1e2c"} loading={loading} size={40} />
              </div>
            ) : (
              <>
                <Nav />
                <Routes>
                  <Route path="/" /*exact*/ element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/delivery" element={<Delivery />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/contactus" element={<Contactus />} />
                  <Route path="/product/:id" element={<Productpage />} />
                  <Route path="/cart/:id" element={<Cartpage />} />
                  <Route path="/cart" element={<Cartpage />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/shipping" element={<Checkout />} />
                  <Route path="/placeorder" element={<Placeorder />} />
                  <Route path="/order/:id" element={<Order />} />
                  <Route path="/admin/userlist" element={<Users />} />
                  <Route path="/admin/productlist" element={<Products />} />
                  <Route path="/admin/orderlist" element={<Orders />} />
                  <Route path="/search/:keyword" element={<Shop />} />
                  <Route path="/admin/user/:id/edit" element={<Edituser />} />
                  <Route
                    path="/admin/product/:id/edit"
                    element={<Editproduct />}
                  />
                  <Route path="/admin/discounts/" element={<Discounts />} />
                  <Route element={<NotFoundPage />} />
                </Routes>
                <Footer />
              </>
            )}
          </ScrollIntoView>
        </Router>
      </ChakraProvider>
    </div>
  );
};
export default App;

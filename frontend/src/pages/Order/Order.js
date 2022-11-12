import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

import { useDispatch, useSelector } from "react-redux";
import HashLoader from "react-spinners/HashLoader";
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from "../../actions/orderActions";
import "./Order.css";
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from "../../constants/orderConstants";
// import { Button } from '@chakra-ui/button';
import ColorBullet from "./../../components/ColorBullet";
import Countries from "./Countries";
import { RiFolderReceivedLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const Order = () => {
  const { id } = useParams();
  const orderId = id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  if (!loading) {
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const navigate = useNavigate();
 const handleOrder =()=>{
  if (!order || successPay || successDeliver || order._id !== orderId) {
    dispatch({
      type: ORDER_PAY_RESET,
    });
    dispatch({
      type: ORDER_DELIVER_RESET,
    });
    dispatch(getOrderDetails(orderId));
  }
 }
  useEffect(() => {
    /* if (!userInfo) {
             navigate('/login')
         }*/
         handleOrder()
  }, []);
  // const successpaymenthandler = (paymentResult) => {
  //   dispatch(payOrder(orderId));
  // };
  // const deliverhandler = () => {
  //   dispatch(deliverOrder(order));
  // };

  return loading || loadingDeliver ? (
    <div className="loading-product">
      <HashLoader
        color={"#1e1e2c"}
        loading={loading || loadingDeliver}
        size={50}
      />
    </div>
  ) : error ? (
    <h1>{error}</h1>
  ) : (
    <div className="placeorder informations-placeorder">
      <Helmet>
        <title>ORDER</title>
      </Helmet>
      <div className="limit-check">
        <div className="info-check">
          <div className="shipping-placeorder">
            <h2>Informations sur la commande</h2>
            <p>
              <strong>Nom: </strong>
              {order.shippingAddress.name +
                " " +
                order.shippingAddress.lastname}
            </p>
            <p>
              <strong>Telephone: </strong>
              {order.shippingAddress.phone}
            </p>
            <p>
              <strong> E-mail: </strong>
              <a href={`mailto:${order.shippingAddress.email}`}>
                {order.shippingAddress.email}
              </a>
            </p>
            <p>
              <strong>Address: </strong>
              {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
              {order.shippingAddress.cp},{" "}
              {
                Countries.find((c) => c.code === order.shippingAddress.country)
                  ?.name
              }
            </p>
            <p>
              <strong>Etat: </strong>
              {order.isDelivered ? (
                <div className="paid">Livré à {order.deliveredAt}</div>
              ) : (
                <div className="notpaid">Pas encore livré</div>
              )}
              {order.isPaid ? (
                <div className="paid">Payé à {order.paidAt}</div>
              ) : (
                <div className="notpaid">Pas encore payé</div>
              )}
            </p>
            <p>
              <strong>Description: </strong>
              {order.description}
            </p>
            <p>
              {" "}
              <strong>Paiement: </strong> aiement à la livraison
            </p>
          </div>
          <div class="your-products">
            {order.orderItems.length === 0 ? (
              <h1>
                {" "}
                <RiFolderReceivedLine size="29" />
                Commande(0)
              </h1>
            ) : (
              <>
                <h1>
                  {" "}
                  <RiFolderReceivedLine size="29" />
                  <span>Commande({order.orderItems.length})</span>
                </h1>
                <div className="cart-summ">
                  {order.orderItems.map((item, index) => (
                    <div
                      style={{
                        cursor: "pointer",
                        marginBottom: 10,
                      }}
                      key={index}
                      onClick={() => {
                        navigate(`/product/${item.product}`);
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: 10,
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <span>{item.qty} X</span>
                          {item.name + " (" + item.size + ") "}
                        </div>
                        <ColorBullet
                          size={20}
                          color={item.color}
                          style={{ marginLeft: 25 }}
                        />
                      </div>
                      <b>{item.qty * item.price}dt</b>
                    </div>
                  ))}
                </div>
                <div className="totalcartOrder">
                  <h3>
                    Prix (
                    {order.orderItems.reduce((acc, item) => {
                      return Number(acc) + Number(item.qty);
                    }, 0)}{" "}
                    elements) :
                  </h3>
                  <h3 className="totalpriceOrder">
                    {order.orderItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                    dt
                  </h3>
                  <h3>Impôts (7%):</h3>
                  <h3 className="totalpriceOrder">
                    {order.orderItems
                      .reduce(
                        (acc, item) => acc + item.qty * item.price * 0.07,
                        0
                      )
                      .toFixed(2)}
                    dt
                  </h3>
                  <h3>Total :</h3>
                  <h3 className="totalpriceOrder">
                    {order.orderItems
                      .reduce(
                        (acc, item) => acc + item.qty * item.price * 1.07,
                        0
                      )
                      .toFixed(2)}
                    dt
                  </h3>
                </div>
                <div className="order-controls">
                  {userInfo?.isAdmin && (
                    <input
                      type="submit"
                      onClick={(e) => {
                        e.preventDefault();
                        if (order.isPaid) {
                          return;
                        }
                        dispatch(payOrder(orderId, {}))
                          .then((res) => {
                            return dispatch(deliverOrder(orderId));
                          })
                          .then(() => {
                            window.location.reload();
                          })
                          .catch((e) => {
                            console.log({ e });
                            //   alert(e.message)
                          });
                      }}
                      className={[
                        "btna2",
                        order.isPaid && "update-order-disabled",
                      ]
                        .map((e) => e || "")
                        .join(" ")}
                      value="Définir comme terminé"
                    />
                  )}{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

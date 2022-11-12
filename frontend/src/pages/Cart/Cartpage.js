import React from 'react'
import { useEffect, useState } from 'react';
import { CardImg } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart } from '../../actions/cartActions';
import Empty from '../../components/Empty';
import Productoncart from '../../components/Productoncart';
import './cartcss.css'
import {useNavigate, useParams} from 'react-router-dom'

const Cartpage = ({ history }) => {
    const { id } = useParams();

    function getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        console.log('Query variable %s not found', variable);
    }

    let qty = getQueryVariable("qty") || 1
    let size = getQueryVariable("size") || ""
    let color = getQueryVariable("color") || ""
    let requestId = getQueryVariable("requestId") || ""
    if (color && color.length && color[0] != "#") {
        color = "#" + color;
    }
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart;
    let navigate = useNavigate();

    useEffect(() => {
        if (id) {
            if (cartItems.find(i => i.requestId === requestId))
                history.replace(window.location.pathname);
            else
                dispatch(addToCart(id, qty, size, color, requestId))
        }
    }, [dispatch, id, qty]);

    const checkoutHandler = () => {
        navigate('/shipping');
    }
    
    const clearCartHandler = () => {
        dispatch(clearCart())
    }
    return (
        <>
            <Helmet>
                <title>Panier</title>
            </Helmet>
            {cartItems.length === 0 ?
                <Empty />
                :
                <div className='cartfull'>
                    <div className='cart'>
                        <h1>Votre panier : {cartItems.length}</h1>
                        <div className='productsoncart'>
                            {cartItems.map(product => (
                                <Productoncart onColorChange={(c) => {
                                }} product={product}
                                    key={product.requestId}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='totalcart'>
                        <h3>
                            Prix ({cartItems.reduce((acc, item) => {
                                return Number(acc) + Number(item.qty)
                            }, 0)} elements) :
                        </h3>
                        <h3 className='totalprice'>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}dt
                        </h3>
                        <h3>
                            Impôts (7%):
                        </h3>
                        <h3 className='totalprice'>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price * 0.07, 0).toFixed(2)}dt
                        </h3>
                        <h3>
                            Total :
                        </h3>
                        <h3 className='totalprice'>
                            {cartItems.reduce((acc, item) => acc + item.qty * item.price * 1.07, 0).toFixed(2)}dt
                        </h3>
                        <button className={'checkoutbtn' + (cartItems.length === 0 ? " checkoutbtndisabled" : "")} disabled={cartItems.length === 0} onClick={() => {
                            navigate("/shop")
                        }}>
                            CONTINUER VOS ACHATS
                        </button>
                        <button className={'checkoutbtn' + (cartItems.length === 0 ? " checkoutbtndisabled" : "")} disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            PASSEZ LA COMMANDE
                        </button>
                        <button className={'checkoutbtn' + (cartItems.length === 0 ? " checkoutbtndisabled" : "")} disabled={cartItems.length === 0} onClick={clearCartHandler}>VIDEZ</button>
                    </div>
                </div>
            }
        </>
    )
}

export default Cartpage

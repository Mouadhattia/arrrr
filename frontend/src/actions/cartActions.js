import axios from 'axios'
import {CART_ADD_ITEM,CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADRESSE,CART_SAVE_PAYMENT,CART_CLEAR , CART_UPDATE_ITEM} from '../constants/cartConstants'

export const addToCart = (id, qty,size , color , requestId) => async (dispatch, getState) => {
if (!id?.length  ||
    !qty ||
    !size ||
    !color?.length || !requestId?.length
  ){
    return;
  }
const { data } = await axios.get(`/api/products/${id}`)
console.log(data)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      images: data.images,
      imagesColors : data.imagesColors , 
      price: data?.sizesPrices[data?.sizes?.indexOf(size)],
      countInStock: data.countInStock,
      qty,
      size,
      color,
      requestId
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart= (product)=> (dispatch,getState)=>{
  dispatch({
    type: CART_REMOVE_ITEM,
    payload : product
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const updateCart= (product)=> (dispatch,getState)=>{
   
  dispatch({
    type: CART_UPDATE_ITEM,
    payload : product
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}


export const clearCart= ()=> (dispatch,getState)=>{
  dispatch({
    type: CART_CLEAR,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveAddressshipping = (data)=> (dispatch,getState)=>{
  dispatch({
    type: CART_SAVE_SHIPPING_ADRESSE,
    payload: data
  })
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savepaymentmethod = (data)=> (dispatch,getState)=>{
  dispatch({
    type: CART_SAVE_PAYMENT,
    payload: data
  })
  localStorage.setItem('paymentMethod', JSON.stringify(data))

}
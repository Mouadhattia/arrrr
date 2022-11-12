import { React, useState, useEffect } from 'react'
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi"
import { Image } from "@chakra-ui/react"
import { Link, useNavigate } from 'react-router-dom'
import Rating from './Rating'
import { addToCart } from "../actions/cartActions";
import { useDispatch, useSelector } from 'react-redux'
const CardProduct = ({ product }) => {
    const navigate = useNavigate()
    const [showbtn, setShowbtn] = useState(false)
    const [Incart, setIncart] = useState(false)
    const dispatch = useDispatch();
    const Cart = useSelector(state => state.cart)
    const { cartItems } = Cart

    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
        }
        return result;
      }
    const addToCartHandler = () => {
        navigate(`/cart/${product._id}?qty=${1}&color=${product.imagesColors[0].substring(1)}&size=${product.sizes[0]}&requestId=${makeid(5)}`)
      }
    useEffect(() => {
        const isincart = cartItems.find(x => x.product === product._id);
        if (isincart) {
            setIncart(true);
        }
        return () => {
        }
    });
    return (
        <>
            <div className='cardProduct' onMouseOver={() => { setShowbtn(true) }}
                onMouseLeave={() => { setShowbtn(false) }}>
                <div className='imgDiv'>
                    <Image className='imgProduct' boxSize='300px' objectFit='cover' src={product.images[0]} />
                </div>
                <div className='bottomcard'>
                    <Link to={`/product/${product._id}`} /*exact*/  >
                        <span>{product.name}</span>
                    </Link>
                    {Incart ? <HiShoppingCart className="iconFav" size='26' onClick={addToCartHandler} /> : <HiOutlineShoppingCart className="iconFav" color='#999' size='26'  onClick={addToCartHandler}/>}
                    <div className='productpricecard'> {`${product.price} dt`}</div>
                    <div className='Rating'>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                    </div>
                </div>
                <Link to={`/product/${product._id}`} /*exact*/ >
                    <button className={showbtn ? 'QuickView QuickViewActive' : 'QuickView'}> Voir les détails</button>
                </Link>
            </div>
        </>
    )
}

export default CardProduct

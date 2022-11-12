import React, { useEffect, useState, useRef } from 'react'
import Rating from '../../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet';

import { listProductDetails, createproductReview, clearProductDetails } from '../../actions/productActions'

import {AiFillShop } from "react-icons/ai"
import { MdDoNotDisturb } from "react-icons/md"

import {useNavigate, useParams} from 'react-router-dom'
import { Image, Select, Button, FormControl, FormLabel, Textarea } from "@chakra-ui/react"
import HashLoader from "react-spinners/HashLoader";
import { PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConstants'
import './product.css'
import { Link } from 'react-router-dom'
import NavigationGuard from '../../components/NavigationGuard';

function safeCode(lambda) {
  try {
    return safeCode()
  } catch (e) {
    return null;
  }
}
const Productpage = ({ history }) => {


  const defaultProductImage = "https://i.ibb.co/SJdN9Tx/no-photo-or-blank-image-icon-loading-images-vector-37375020.jpg"
  const [qty, setQty] = useState(1)
  const [rating, setrating] = useState(0)
  const [comment, setcomment] = useState('')
  const imgs = document.querySelectorAll('.img-select a');
  const imgShowcase = useRef(null);
  const imgBtns = [...imgs];
  let imgId = 1;
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);

  const { loading, error, product } = productDetails;
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector(state => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview, } = productReviewCreate
  const [selectedColor, setSelectedColor] = useState(null)
  const [currentImage, setCurrentImage] = useState(null)
  const [size, setSize] = useState(product?.sizes?.length == 1 ? product?.sizes[0] : null)
  const navigate = useNavigate();
  const {id} = useParams()
 
  imgBtns.forEach((imgItem) => {
    imgItem.addEventListener('click', (event) => {
      event.preventDefault();
      imgId = imgItem.dataset.id;
      slideImage();
    });
  });

  function slideImage() {
    const displayWidth = document.querySelector('.img-showcase img:first-child').clientWidth;
    imgShowcase.current.style.transform = `translateX(${- (imgId - 1) * displayWidth}px)`;
  }

  useEffect(() => {
    if (successProductReview) {
      setrating(0)
      setcomment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    if (!product && !loading)
    {
      dispatch(listProductDetails(id));
    }
  }, [dispatch, successProductReview, id, product, loading])


  useEffect(() => {
    if (!product)
    {
      return;
    }
    if (selectedColor?.length && currentImage === null) {
      setCurrentImage(
        product.images[product.imagesColors.indexOf(selectedColor)]
        || product.images[0]
      )
    }
    if (selectedColor === null)
    {
      setSelectedColor(product.imagesColors[0])
    }
    if (size === null)
    {
      setSize(product.sizes[0])
    }
    
  }, [selectedColor,product])

  const submithanlder = () => {
    dispatch(createproductReview(id,
      {
        rating,
        comment: comment?.length ? comment : "-- Commentaire vide --"
      }
    ))
  }
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
  //Handler of button add to cart
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}&color=${selectedColor.substring(1)}&size=${size}&requestId=${makeid(5)}`)
  }
  if (!product || !product.images?.length) {
    return <div></div>
  }
  return (
    <>
      <Helmet>
        <title>{product?.name}</title>
      </Helmet>
      <NavigationGuard
        onLeave={() => {
          setQty(1)
          setSelectedColor(null)
          setSize(null)
          setCurrentImage(null)
          dispatch(clearProductDetails())
        }}
        onEnter={() => {
          setQty(1)
          setSelectedColor(null)
          setSize(null)
          setCurrentImage(null)
        }}
      />
      <div className='productpage'>
        {loading ? <div className='loading-product'>
          <HashLoader color={"#1e1e2c"} loading={loading} size={50} />
        </div> : error ? <h2>{error} </h2> :
          <div className="card-wrapper">
            <div className="card">
              <div className="product-imgs">
                <div className="img-display">
                  <div ref={imgShowcase} className="img-showcase">
                    {
                      <Image src={
                        currentImage || defaultProductImage}
                        style={{
                          maxWidth : 400
                        }} />
                    }
                  </div>
                </div>
              </div>
              <div className="product-content">
                <h2 className="product-title">{product?.name} </h2>
                <Link to='/shop' className="product-link">VISITEZ NOTRE BOUTIQUE</Link>
                <Rating
                  value={product?.rating}
                  text={`${product?.numReviews} reviews`}
                />
                <div className="product-price">
                  <p className="new-price">Prix : <span>{product?.sizesPrices[product?.sizes?.indexOf(size)]
                  }dt</span></p>
                </div>
                <div className="product-detail">
                  <h2>À propos de cet article : </h2>
                  <p>{product?.description}</p>
                  <div>
                    <ul>
                      <li>Taille</li> <Select value={size} onChange={(event) => {
                        setSize(event.target.value)
                      }} className='select-product' placeholder="Choisir une option">
                        {product?.sizes.map(size => (
                          <option value={size}>{size}</option>
                        ))}
                      </Select>
                    </ul>
                  </div>
                  <div>
                    <ul>
                      <li>Couleur</li>
                      <div
                        style={{
                          display: "flex",
                          width: "100%",
                          justifyContent: "space-around"
                        }}
                      >{
                          product?.imagesColors.map((c, i) => {
                            return (<div
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                                backgroundColor: c,
                                ... (selectedColor === c ? {
                                  borderColor: "black",
                                  borderWidth: 5,
                                  padding: 20
                                } : {})
                              }} onClick={() => setSelectedColor(c)}
                              key={i} >
                            </div>)
                          })
                        }</div>
                    </ul>
                  </div>
                  <ul>
                    <li>Etat: <span>{product?.countInStock > 0 ? 'en stock' : 'hors stock'}</span></li>
                    <li>Catégorie: <span>{product?.category.join(" | ")}</span></li>
                    <div>
                      <ul> <li>Quantité  :</li>
                        {
                        product?.countInStock > 0 ?
                          <Select as='select' size="md" maxW={20} value={qty} className='select-product' onChange={(e) => setQty(e.target.value)} >
                            {[...Array(product?.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>))}
                          </Select>
                          : <span style={{ display: 'flex' }}><MdDoNotDisturb size='26' />   HORS STOCK  </span>
                        }
                      </ul>
                    </div>
                  </ul>
                </div>
                <div className="purchase-info">
                  <Button onClick={addToCartHandler} type="button" className="btn-shop" disabled={!size || product?.countInStock === 0 || !selectedColor?.length}> <AiFillShop size='24' />Ajouter au panier</Button>
                </div>
              </div>
            </div>
          </div>
        }
        <div className='REVIEWS'>
          <h1>Commentaires :</h1>
          {product?.reviews.length === 0 && <h2>AUCUN AVIS</h2>}
          <div>
            {product?.reviews.map(review => (
              <div className='review'>
                <h4>{review.name}</h4>
                <div className='Ratingreview'>
                  <Rating value={review.rating} />

                </div>
                <p className='commentreview'>{review.comment}</p>
                <p className='datereview'>{review.createdAt.substring(0, 10)}</p>

              </div>

            ))}
            <div className='createreview'>
              <h1>Créer un nouvel avis :</h1>
              {errorProductReview && <h2>{errorProductReview}</h2>}
              {userInfo ? (
                <FormControl>
                  <FormLabel>Évaluation :</FormLabel>
                  <Select onChange={(e) => setrating(e.target.value)} >
                    <option value='1'>1 Mauvais</option>
                    <option value='2'>2 PAS MAL</option>
                    <option value='3'>3 BIEN</option>
                    <option value='4'>4 TRÉS BIEN</option>
                    <option value='5'>5 EXCELLENT</option>
                  </Select>
                  <FormLabel>Commentaire :</FormLabel>
                  <Textarea onChange={(e) => setcomment(e.target.value)} placeholder='Laissez un commentaire ici :' />
                  <Button colorScheme='blue' onClick={submithanlder}>Envoyer</Button>
                </FormControl>
              ) :
                <>
                  Veuillez vous<Link to='/login' style={{color :"blue"}}> connecter</Link> pour écrire un commentaire
                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Productpage

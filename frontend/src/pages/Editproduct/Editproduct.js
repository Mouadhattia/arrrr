import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, UpdateProduct } from '../../actions/productActions'
import HashLoader from "react-spinners/HashLoader";
import { Input, InputGroup, } from '@chakra-ui/input'
import { Helmet } from 'react-helmet';

import { Box, Checkbox, color, Stack, Textarea, VStack } from '@chakra-ui/react'
import { PRODUCT_UPDATE_RESET } from '../../constants/productConstants';

import { SketchPicker } from 'react-color';
import { useParams} from 'react-router-dom'

import './Editproduct.css'
const Editproduct = ({  history }) => {
    
    const { id : productId} = useParams();
    const [name, setName] = useState('')
    const [description, setdescription] = useState('')
    const [price, setprice] = useState(0)
    const [countInStock, setcountInStock] = useState(0)
    const [Url1, setUrl1] = useState('')
    const [Url2, setUrl2] = useState('')
    const [Url3, setUrl3] = useState('')
    const [Url4, setUrl4] = useState('')

    const [color1, setColor1] = useState('');
    const [color2, setColor2] = useState('');
    const [color3, setColor3] = useState('');
    const [color4, setColor4] = useState('');

    const [Images, setImages] = useState([])
    const [sizes, setsizes] = useState([])
    const [category, setcategory] = useState([])
    const [Decorationselected, setDecorationselected] = useState(false)
    const [Meubleselected, setMeubleselected] = useState(false)
    const [Accessoiresselected, setAccessoiresselected] = useState(false)

    const [active , setActive ] = useState(false)

    const [message, setMessage] = useState("")
    const [price1, setPrice1] = useState("")
    const [price2, setPrice2] = useState("")
    const [price3, setPrice3] = useState("")
    const [price4, setPrice4] = useState("")
    const [price5, setPrice5] = useState("")


    const [size1, setSize1] = useState("")
    const [size2, setSize2] = useState("")
    const [size3, setSize3] = useState("")
    const [size4, setSize4] = useState("")
    const [size5, setSize5] = useState("")


    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)

    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)

    const { loading: lodingUpdate, error: errorUpdate, success: successUpdate } = productUpdate


    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            window.location.reload()
        }
        else {
            if (!product?.name || product?._id !== productId) {
                dispatch(listProductDetails(productId))
            } else {
                setName(product.name)
                setprice(product.price)
                setdescription(product.description)
                
                setUrl1(product.images[0])
                setUrl2(product.images[1])
                setUrl3(product.images[2])
                setUrl4(product.images[3])

                setColor1({
                    hex: product.imagesColors[0]
                })
                setColor2({
                    hex: product.imagesColors[1]
                })
                setColor3({
                    hex: product.imagesColors[2]
                })
                setColor4({
                    hex: product.imagesColors[3]
                })
                setActive(product.active)
                /*
                if (
                    product.sizes[0] === "normal" && product.sizes[1]?.length || 0 + product.sizesPrices[1]?.length || 0 + product.sizes[2]?.length || 0 + product.sizesPrices[2]?.length || 0 + product.sizes[3]?.length || 0 + product.sizesPrices[3]?.length || 0 === 0
                ) {
                    setPrice1(product.price)
                    setSize1("normal")
                } else {
                    setSize1(product.sizes[0])
                    setSize2(product.sizes[1])
                    setSize3(product.sizes[2])
                    setSize4(product.sizes[3])
                    setSize5(product.sizes[4])


                    setPrice1(product.sizesPrices[0])
                    setPrice2(product.sizesPrices[1])
                    setPrice3(product.sizesPrices[2])
                    setPrice4(product.sizesPrices[3])
                    setPrice5(product.sizesPrices[4])
                }
                 */



                setSize1(product.sizes[0])
                setSize2(product.sizes[1])
                setSize3(product.sizes[2])
                setSize4(product.sizes[3])
                setSize5(product.sizes[4])


                setPrice1(product.sizesPrices[0])
                setPrice2(product.sizesPrices[1])
                setPrice3(product.sizesPrices[2])
                setPrice4(product.sizesPrices[3])
                setPrice5(product.sizesPrices[4])

                setcategory(product.category)
                setcountInStock(product.countInStock)
                setAccessoiresselected(category.includes("Accessoires"))
                setDecorationselected(category.includes("Decoration"))
                setMeubleselected(category.includes("Meuble"))
            }
        }

        return () => {
        }
    }, [dispatch, productId, history, product, category, successUpdate])


    const catSelected =  (Meubleselected || Decorationselected || Accessoiresselected);

    const submitHandler = (e) => {
        if (!catSelected) {
            e.preventDefault();
            return;
        }
        let colors = [];
        if (Url1?.length) {
            Images.push(Url1)
            colors.push(color1?.hex)
        }
        if (Url2?.length) {
            Images.push(Url2)
            colors.push(color2?.hex)
        }
        if (Url3?.length) {
            Images.push(Url3)
            colors.push(color3?.hex)
        }
        if (Url4?.length) {
            Images.push(Url4)
            colors.push(color4?.hex)
        }
        e.preventDefault()
        let sizesCopy = [size1, size2, size3, size4, size5]
        let sizesPricesCopy = [price1, price2, price3, price4, price5].filter((e, i) => sizesCopy[i] != null)
        sizesCopy = sizesCopy.filter((e, i) => e != null)
        if ((new Set(sizesCopy)).size !== sizesCopy.length) {
            if (!window.confirm("Size duplication found , you still want to update product ?")) {
                return;
            }
        }
        if (sizesPricesCopy.filter((i) => i === null || i === "").length) {
            alert("You should set the price for every size")
            return;
        }
        if ((new Set(colors)).size !== colors.length) {
            alert("Color duplication found , every color should be unique with it's image");
            return;
        }
        const updatedProduct = {
            _id: productId,
            name,
            price,
            Images,
            category,
            sizes: sizesCopy,
            sizesPrices: sizesPricesCopy,
            countInStock,
            description,
            imagesColors: colors , 
            active
        }
        console.log({ updatedProduct });
        dispatch(UpdateProduct(updatedProduct))
    }

    const checkboxhandlercg = (D) => {
        let index = category.indexOf(D)
        if (index > -1) {
            category.splice(index, 1)
        }
        else {
            category.push(D)
        }
    }

    const defaultPriceLinkedToSizesPrices = () => {
        return false;
        return (
            size1 === "normal" && size2?.length || 0 + price2?.length || 0 + size3?.length || 0 + price3?.length || 0 + size4?.length || 0 + price4?.length || 0 === 0
        )
    }
    
    return (
        <div className='Edituser'>
            <Helmet>
                <title>Modifier le produit</title>
            </Helmet>
            {error && <h4>{error}</h4>}
            {/* {successUpdate && <h4>Profile Updated</h4>} */}
            {loading || lodingUpdate ?
                <div className='loading'>
                    <HashLoader color={"#1e1e2c"} loading={lodingUpdate} size={40} />
                </div> : errorUpdate ? <h4>{errorUpdate}</h4> :
                    <div>
                        <h4 className='Edittitle'>Modifier le produit :</h4>
                        <div className='formedit'>
                            <form onSubmit={submitHandler}>
                                <div >
                                    <div className="input-div zz">
                                        Nom :
                                        <div className="div">
                                            <InputGroup>
                                                <Input type="text" value={name} placeholder="Entrez le nom" onChange={(e) => setName(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="input-div one">
                                        Prix :
                                        <div className="div">
                                            <InputGroup>
                                                <Input type="text" value={price} placeholder="Entrez le prix" onChange={(e) => {
                                                    setprice(e.target.value)
                                                    if (defaultPriceLinkedToSizesPrices()) {
                                                        setPrice1(e.target.value)
                                                    }
                                                }} />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="input-div one">
                                        Quantités en stock :
                                        <div className="div">
                                            <InputGroup>
                                                <Input type="text" value={countInStock} placeholder="Entrez la quantités en stock" onChange={(e) => setcountInStock(e.target.value)} />
                                            </InputGroup>
                                        </div>
                                    </div>
                                    <div className="input-div one">
                                        Description/Categorie
                                        <div className="div">
                                            <Stack direction='column' spacing={4}>
                                                <InputGroup>
                                                    <Textarea size='sm' value={description} placeholder="Entrez le prix" onChange={(e) => setdescription(e.target.value)} />
                                                </InputGroup>
                                                <Stack direction="row">
                                                    <Checkbox onChange={() => { checkboxhandlercg('Decoration'); setDecorationselected(!Decorationselected) }} isChecked={Decorationselected}>Decoration </Checkbox>
                                                    <Checkbox onChange={() => { checkboxhandlercg('Meuble'); setMeubleselected(!Meubleselected) }} isChecked={Meubleselected}>Meuble </Checkbox>
                                                    <Checkbox onChange={() => { checkboxhandlercg('Accessoires'); setAccessoiresselected(!Accessoiresselected) }} isChecked={Accessoiresselected}>Accessoires </Checkbox>
                                                </Stack>
                                            </Stack>
                                        </div>
                                    </div>
                                    
                                    <div className="input-div one">
                                        Produit active :
                                        <div className="div">
                                            <InputGroup>
                                                <Checkbox type="text" value={active} placeholder="Produit active" onChange={(e) => setActive(e.target.value)} />
                                             </InputGroup>
                                        </div>
                                    </div>
                                    <div className="input-div pass">
                                        <div className="div">
                                        </div>
                                    </div>

                                    <div className="input-div pass">
                                        Sizes:

                                        <div className="div">

                                            <Stack direction="row">
                                                <div className='pair-input' >
                                                    <input className="text-input-compact" type="text" value={size1} onChange={(e) => setSize1(e.target.value)} placeholder='taille 1' />
                                                    <input className="text-input-compact" type="text" value={price1} onChange={(e) => {
                                                        setPrice1(e.target.value)
                                                        if (defaultPriceLinkedToSizesPrices()) {
                                                            setprice(e.target.value)
                                                        }
                                                    }} placeholder='prix 1' />
                                                </div>

                                                <div className='pair-input'  >
                                                    <input className="text-input-compact" type="text" value={size2} onChange={(e) => setSize2(e.target.value)} placeholder='taille 2' />
                                                    <input className="text-input-compact" type="text" value={price2} onChange={(e) => setPrice2(e.target.value)} placeholder='prix 2' />
                                                </div>

                                                <div className='pair-input' >
                                                    <input className="text-input-compact" type="text" value={size3} onChange={(e) => setSize3(e.target.value)} placeholder='taille 3' />
                                                    <input className="text-input-compact" type="text" value={price3} onChange={(e) => setPrice3(e.target.value)} placeholder='prix 3' />
                                                </div>

                                                <div className='pair-input' >
                                                    <input className="text-input-compact" type="text" value={size4} onChange={(e) => setSize4(e.target.value)} placeholder='taille 4' />
                                                    <input className="text-input-compact" type="text" value={price4} onChange={(e) => setPrice4(e.target.value)} placeholder='prix 4' />
                                                </div>

                                                <div className='pair-input'  >
                                                    <input className="text-input-compact" type="text" value={size5} onChange={(e) => setSize5(e.target.value)} placeholder='taille 5' />
                                                    <input className="text-input-compact" type="text" value={price5} onChange={(e) => setPrice5(e.target.value)} placeholder='prix 5' />
                                                </div>
                                            </Stack>
                                        </div>
                                    </div>
                                    <div className="input-div pass">
                                        Urls for images:
                                        <div className="div urls">
                                            <Box>
                                                <Stack direction='row' >

                                                    <div className="image-color-container">
                                                        <Input type='text' value={Url1} onChange={(e) => { setUrl1(e.target.value) }} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row"
                                                        }} >
                                                            <SketchPicker
                                                                color={color1}
                                                                onChangeComplete={setColor1}
                                                            />
                                                            <img
                                                                src={Url1}
                                                                style={{
                                                                    width: 70,
                                                                    height: 70
                                                                }}
                                                                alt='' />
                                                        </div>
                                                    </div><div className="image-color-container">
                                                        <Input type='text' value={Url2} onChange={(e) => { setUrl2(e.target.value) }} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row"
                                                        }} >
                                                            <SketchPicker
                                                                color={color2}
                                                                onChangeComplete={setColor2}
                                                            />
                                                            <img
                                                                src={Url2}
                                                                style={{
                                                                    width: 70,
                                                                    height: 70
                                                                }}
                                                                alt='' />
                                                        </div>
                                                    </div>
                                                </Stack>
                                                <Stack direction="row">
                                                    <div className="image-color-container">
                                                        <Input type='text' value={Url3} onChange={(e) => { setUrl3(e.target.value) }} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row"
                                                        }} >
                                                            <SketchPicker
                                                                color={color3}
                                                                onChangeComplete={setColor3}
                                                            />
                                                            <img
                                                                src={Url3}
                                                                style={{
                                                                    width: 70,
                                                                    height: 70
                                                                }}
                                                                alt='' />
                                                        </div>
                                                    </div><div className="image-color-container">
                                                        <Input type='text' value={Url4} onChange={(e) => { setUrl4(e.target.value) }} />
                                                        <div style={{
                                                            display: "flex",
                                                            flexDirection: "row"
                                                        }} >
                                                            <SketchPicker
                                                                color={color4}
                                                                onChangeComplete={setColor4}
                                                            />
                                                            <img
                                                                src={Url4}
                                                                style={{
                                                                    width: 70,
                                                                    height: 70
                                                                }}
                                                                alt=''/>
                                                        </div>
                                                    </div>
                                                </Stack>
                                            </Box>
                                            {/* <Input type= 'text' value={category} onChange = {(e)=>{setcategory((e.target.value).split(' ')) ; }}/> */}
                                        </div>
                                    </div>
                                    {message && <h4 className='Message'>{message}</h4>}
                                    <input type="submit"  className={"btna2 postionbtnupdate " + (! catSelected? "update-product-disabled" : "" )} value="Mettre à jour" />
                                </div>
                            </form>
                        </div>
                    </div>
            }
        </div>
    )
}

export default Editproduct

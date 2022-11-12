import { Image } from '@chakra-ui/image'
import React, { useRef, useState, useEffect } from 'react'
import { Select } from "@chakra-ui/react"
import { FaRegWindowClose } from "react-icons/fa";
import { addToCart, removeFromCart, updateCart } from '../actions/cartActions';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';



const Productoncart = ({ product }) => {
    const dispatch = useDispatch();
    const [selectedColor, setSelectedColor] = useState(product?.color)
    const [qty, setqty] = useState(0)
    const select = useRef(null);
    const [currentImage, setCurrentImage] = useState("")
    useEffect(() => {
            setCurrentImage(product.images[product.imagesColors.indexOf(selectedColor)])

    }, [])


    const optionvalue = () => {
        setqty(parseInt(select.current.value));
    }

    const removeFromCartHandler = (product) => {
        dispatch(removeFromCart(product))
    }
    useEffect(() => {
        !selectedColor?.length && setSelectedColor(product.imagesColors?.at(0));
        setqty(product.qty)

    }, [product])
    window.mobileAndTabletCheck = function () {
        let check = false;
        (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
        return check;
    };
    return (
        <div key={product.requestId} className='productcart'>
            <div className='imagecart'>
                <Image objectFit="cover" src={currentImage} />
            </div>
            <div>
                <h2 className='productname'>
                    {product.name}
                </h2>
                <h2 className='productname'>
                    {product.size}
                </h2>
                <h2 className='priceproduct'>
                    {product.price}dt</h2>
            </div>
            <div className='qtyoption'
                style={(window.mobileAndTabletCheck() ?
                    {
                        marginTop: "8px",
                        height: "max-content",
                        width: "max-content",
                        fontSize: "20px",
                        display: "flex",
                        flexDirection: "column"
                    } :
                    {
                        marginTop: "8px",
                        height: "max-content",
                        width: "300px",
                        fontSize: "20px",
                    })}>
                <div
                    style={(window.mobileAndTabletCheck() ? {
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "column"
                    } : {
                        display: "flex",
                        justifyContent: "space-between"
                    })}>
                    <div style={{ width: 80 }} >
                        <Select
                            ref={select} defaultValue={product.qty}
                            onChange={e => {
                                dispatch(updateCart({
                                    ...product,
                                    qty: Number(e.target.value)
                                }))
                                setqty(Number(e.target.value))
                            }}
                            value={qty}
                        >
                            {[...Array(product.countInStock).keys()].map(x =>
                            (
                                <option value={x + 1}> {x + 1}</option>
                            )
                            )}
                        </Select>
                    </div>
                    <h2>
                        {(qty === 0 ? product.qty * product.price : qty * product.price).toFixed(2)}dt
                    </h2>
                    {
                        window.mobileAndTabletCheck() ?
                            <span className='cart-remove' onClick={() => removeFromCartHandler(product)}>
                                Enlever
                            </span> : <FaRegWindowClose className='deletecart' size='26' onClick={() => removeFromCartHandler(product)} />
                    }
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        paddingTop: 10
                    }}
                >{
                        product?.imagesColors?.map((c, i) => {
                            return (<div className='product_cart_color'
                                style={{
                                    width: "50px",
                                    height: "50px",
                                    borderRadius: 25,
                                    backgroundColor: c,
                                    ... (selectedColor === c ? {
                                        borderColor: "black",
                                        borderWidth: "5px",
                                        padding: "20px"
                                    } : {})
                                }} onClick={e => {
                                    const val = dispatch(updateCart({
                                        ...product,
                                        color: c
                                    }
                                    ))
                                    setSelectedColor(c)

                                }
                                }
                                key={i} >
                            </div>)
                        })
                    }</div>

            </div>
        </div>
    )
}

export default Productoncart

import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Input, Stack, Select, Image, Link } from "@chakra-ui/react"
import { RiShoppingCart2Line } from "react-icons/ri"
import './checkout.css'
import { clearCart, saveAddressshipping, savepaymentmethod } from '../../actions/cartActions'
import { useDispatch, useSelector } from 'react-redux'

import { CreateOrder } from "../../actions/orderActions";
import ColorBullet from "./../../components/ColorBullet"

import {useNavigate} from 'react-router-dom'

const Checkout = ({ history }) => {
    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    const [phone, setPhone] = useState(shippingAddress.phone)
    const [email, setEmail] = useState(shippingAddress.email)
    const [name, setName] = useState(shippingAddress.name)
    const [lastName, setLastName] = useState(shippingAddress.lastName)
    const [description, setDescription] = useState(shippingAddress.description)
    const form = React.createRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    const handleorder = (e) => {
        e.preventDefault()
        const elements = Array.prototype.slice.call(e.target.elements).filter(e => e.name && e.name.length).map(e => ({ name: e.name, value: e.value }))
        const addressShipping = Object.fromEntries(elements.map(e => [e.name, e.value]));
        dispatch(saveAddressshipping(addressShipping))
        cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
        cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
        cart.taxPrice = addDecimals(Number((0.07 * cart.itemsPrice).toFixed(2)))
        cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
        dispatch(CreateOrder({
            orderItems: cart.cartItems.map(item => ({
                name: item.name,
                qty: item.qty,
                image: item.images.at(item.imagesColors.indexOf(item.color)),
                price: item.price,
                color: item.color,
                size: item.size,
                product: item.product,
            })),
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
            description
        })).then(res => {
            dispatch(clearCart())
            const id = res?._id
            if (id) {
                navigate(`/order/${id}`)
            }
            console.log({ res });
        }).catch(e => {
            console.log({ e });
        })
    }
    return (
        <div>
            <Helmet>
                <title>Checkout</title>
            </Helmet>
            <div className="limit-check">
                <div className="shipping-info-check">
                    <form ref={form} onSubmit={handleorder}>
                        <div className="billing-check">
                            <h1>Informations de livraison </h1>
                            <label for="name" className="this-label">Pr??nom  <span className="required">*</span></label>
                            <Input name="name" variant="flushed" placeholder="Pr??nom" required value={name} id="name" onChange={(e) => setName(e.target.value)} /><br />
                            <label for="lastname" className="this-label">Nom <span className="required">*</span></label><br />
                            <Input name="lastname" variant="flushed" placeholder="Nom" required value={lastName} id="lastname" onChange={(e) => setLastName(e.target.value)} /><br />
                            <label for="address" className="this-label">Address <span className="required">*</span></label><br />
                            <Input name="address" variant="flushed" placeholder="Votre adresse" required value={address} id="address" onChange={(e) => setAddress(e.target.value)} /><br />
                            <label className="this-label">Pays</label><br />
                            <Stack spacing={3}>
                                <Select name="country" defaultValue="TN" variant="flushed" value={country} onChange={(e) => setCountry(e.target.value)} >
                                    <option value="AF">L'Afghanistan</option>
                                    <option value="AX">Iles Aland</option>
                                    <option value="AL">Albanie</option>
                                    <option value="DZ">Alg??rie</option>
                                    <option value="AS">Samoa am??ricaines</option>
                                    <option value="AD">Andorre</option>
                                    <option value="AO">L'Angola</option>
                                    <option value="AI">Anguilla</option>
                                    <option value="AQ">Antarctique</option>
                                    <option value="AG">Antigua-et-Barbuda</option>
                                    <option value="AR">Argentine</option>
                                    <option value="AM">Arm??nie</option>
                                    <option value="AW">Aruba</option>
                                    <option value="AU">Australie</option>
                                    <option value="AT">L'Autriche</option>
                                    <option value="AZ">Azerba??djan</option>
                                    <option value="BS">Bahamas</option>
                                    <option value="BH">Bahre??n</option>
                                    <option value="BD">Bangladesh</option>
                                    <option value="BB">Barbade</option>
                                    <option value="BY">Bi??lorussie</option>
                                    <option value="BE">Belgique</option>
                                    <option value="BZ">Belize</option>
                                    <option value="BJ">B??nin</option>
                                    <option value="BM">Bermudes</option>
                                    <option value="BT">Bhoutan</option>
                                    <option value="BO">Bolivie</option>
                                    <option value="BQ">Bonaire, Saint-Eustache et Saba</option>
                                    <option value="BA">Bosnie Herz??govine</option>
                                    <option value="BW">Botswana</option>
                                    <option value="BV">??le Bouvet</option>
                                    <option value="BR">Br??sil</option>
                                    <option value="IO">Territoire britannique de l'oc??an Indien</option>
                                    <option value="BN">Brunei Darussalam</option>
                                    <option value="BG">Bulgarie</option>
                                    <option value="BF">Burkina Faso</option>
                                    <option value="BI">Burundi</option>
                                    <option value="KH">Cambodge</option>
                                    <option value="CM">Cameroun</option>
                                    <option value="CA">Canada</option>
                                    <option value="CV">Cap-Vert</option>
                                    <option value="KY">??les Ca??mans</option>
                                    <option value="CF">R??publique centrafricaine</option>
                                    <option value="TD">Tchad</option>
                                    <option value="CL">Chili</option>
                                    <option value="CN">Chine</option>
                                    <option value="CX">L'??le de no??l</option>
                                    <option value="CC">??les Cocos (Keeling)</option>
                                    <option value="CO">Colombie</option>
                                    <option value="KM">Comores</option>
                                    <option value="CG">Congo</option>
                                    <option value="CD">Congo, R??publique d??mocratique du Congo</option>
                                    <option value="CK">les ??les Cook</option>
                                    <option value="CR">Costa Rica</option>
                                    <option value="CI">C??te d'Ivoire</option>
                                    <option value="HR">Croatie</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CW">Curacao</option>
                                    <option value="CY">Chypre</option>
                                    <option value="CZ">R??publique Tch??que</option>
                                    <option value="DK">Danemark</option>
                                    <option value="DJ">Djibouti</option>
                                    <option value="DM">Dominique</option>
                                    <option value="DO">R??publique dominicaine</option>
                                    <option value="EC">Equateur</option>
                                    <option value="EG">Egypte</option>
                                    <option value="SV">Le Salvador</option>
                                    <option value="GQ">Guin??e ??quatoriale</option>
                                    <option value="ER">??rythr??e</option>
                                    <option value="EE">Estonie</option>
                                    <option value="ET">Ethiopie</option>
                                    <option value="FK">??les Falkland (Malvinas)</option>
                                    <option value="FO">??les F??ro??</option>
                                    <option value="FJ">Fidji</option>
                                    <option value="FI">Finlande</option>
                                    <option value="FR">France</option>
                                    <option value="GF">Guyane Fran??aise</option>
                                    <option value="PF">Polyn??sie fran??aise</option>
                                    <option value="TF">Terres australes fran??aises</option>
                                    <option value="GA">Gabon</option>
                                    <option value="GM">Gambie</option>
                                    <option value="GE">G??orgie</option>
                                    <option value="DE">Allemagne</option>
                                    <option value="GH">Ghana</option>
                                    <option value="GI">Gibraltar</option>
                                    <option value="GR">Gr??ce</option>
                                    <option value="GL">Groenland</option>
                                    <option value="GD">Grenade</option>
                                    <option value="GP">Guadeloupe</option>
                                    <option value="GU">Guam</option>
                                    <option value="GT">Guatemala</option>
                                    <option value="GG">Guernesey</option>
                                    <option value="GN">Guin??e</option>
                                    <option value="GW">Guin??e-Bissau</option>
                                    <option value="GY">Guyane</option>
                                    <option value="HT">Ha??ti</option>
                                    <option value="HM">??les Heard et McDonald</option>
                                    <option value="VA">Saint-Si??ge (??tat de la Cit?? du Vatican)</option>
                                    <option value="HN">Honduras</option>
                                    <option value="HK">Hong Kong</option>
                                    <option value="HU">Hongrie</option>
                                    <option value="IS">Islande</option>
                                    <option value="IN">Inde</option>
                                    <option value="ID">Indon??sie</option>
                                    <option value="IR">Iran (R??publique islamique d</option>
                                    <option value="IQ">Irak</option>
                                    <option value="IE">Irlande</option>
                                    <option value="IM">??le de Man</option>
                                    <option value="IL">Isra??l</option>
                                    <option value="IT">Italie</option>
                                    <option value="JM">Jama??que</option>
                                    <option value="JP">Japon</option>
                                    <option value="JE">Jersey</option>
                                    <option value="JO">Jordan</option>
                                    <option value="KZ">Kazakhstan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="KI">Kiribati</option>
                                    <option value="KP">R??publique populaire d??mocratique de Cor??e</option>
                                    <option value="KR">Cor??e, R??publique de</option>
                                    <option value="XK">Kosovo</option>
                                    <option value="KW">Koweit</option>
                                    <option value="KG">Kirghizistan</option>
                                    <option value="LA">R??publique d??mocratique populaire lao</option>
                                    <option value="LV">Lettonie</option>
                                    <option value="LB">Liban</option>
                                    <option value="LS">Lesotho</option>
                                    <option value="LR">Lib??ria</option>
                                    <option value="LY">Jamahiriya arabe libyenne</option>
                                    <option value="LI">Liechtenstein</option>
                                    <option value="LT">Lituanie</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MO">Macao</option>
                                    <option value="MK">Mac??doine, ancienne R??publique yougoslave de</option>
                                    <option value="MG">Madagascar</option>
                                    <option value="MW">Malawi</option>
                                    <option value="MY">Malaisie</option>
                                    <option value="MV">Maldives</option>
                                    <option value="ML">Mali</option>
                                    <option value="MT">Malte</option>
                                    <option value="MH">Iles Marshall</option>
                                    <option value="MQ">Martinique</option>
                                    <option value="MR">Mauritanie</option>
                                    <option value="MU">Ile Maurice</option>
                                    <option value="YT">Mayotte</option>
                                    <option value="MX">Mexique</option>
                                    <option value="FM">Micron??sie, ??tats f??d??r??s de</option>
                                    <option value="MD">Moldova, R??publique de</option>
                                    <option value="MC">Monaco</option>
                                    <option value="MN">Mongolie</option>
                                    <option value="ME">Mont??n??gro</option>
                                    <option value="MS">Montserrat</option>
                                    <option value="MA">Maroc</option>
                                    <option value="MZ">Mozambique</option>
                                    <option value="MM">Myanmar</option>
                                    <option value="NA">Namibie</option>
                                    <option value="NR">Nauru</option>
                                    <option value="NP">N??pal</option>
                                    <option value="NL">Pays-Bas</option>
                                    <option value="AN">Antilles n??erlandaises</option>
                                    <option value="NC">Nouvelle Cal??donie</option>
                                    <option value="NZ">Nouvelle-Z??lande</option>
                                    <option value="NI">Nicaragua</option>
                                    <option value="NE">Niger</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NU">Niue</option>
                                    <option value="NF">l'ile de Norfolk</option>
                                    <option value="MP">??les Mariannes du Nord</option>
                                    <option value="NO">Norv??ge</option>
                                    <option value="OM">Oman</option>
                                    <option value="PK">Pakistan</option>
                                    <option value="PW">Palau</option>
                                    <option value="PS">Territoire palestinien, occup??</option>
                                    <option value="PA">Panama</option>
                                    <option value="PG">Papouasie Nouvelle Guin??e</option>
                                    <option value="PY">Paraguay</option>
                                    <option value="PE">P??rou</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PN">Pitcairn</option>
                                    <option value="PL">Pologne</option>
                                    <option value="PT">Le Portugal</option>
                                    <option value="PR">Porto Rico</option>
                                    <option value="QA">Qatar</option>
                                    <option value="RE">R??union</option>
                                    <option value="RO">Roumanie</option>
                                    <option value="RU">F??d??ration Russe</option>
                                    <option value="RW">Rwanda</option>
                                    <option value="BL">Saint Barth??lemy</option>
                                    <option value="SH">Sainte-H??l??ne</option>
                                    <option value="KN">Saint-Christophe-et-Ni??v??s</option>
                                    <option value="LC">Sainte-Lucie</option>
                                    <option value="MF">Saint Martin</option>
                                    <option value="PM">Saint-Pierre-et-Miquelon</option>
                                    <option value="VC">Saint-Vincent-et-les-Grenadines</option>
                                    <option value="WS">Samoa</option>
                                    <option value="SM">Saint Marin</option>
                                    <option value="ST">Sao Tom?? et Principe</option>
                                    <option value="SA">Arabie Saoudite</option>
                                    <option value="SN">S??n??gal</option>
                                    <option value="RS">Serbie</option>
                                    <option value="CS">Serbie et Mont??n??gro</option>
                                    <option value="SC">les Seychelles</option>
                                    <option value="SL">Sierra Leone</option>
                                    <option value="SG">Singapour</option>
                                    <option value="SX">St Martin</option>
                                    <option value="SK">Slovaquie</option>
                                    <option value="SI">Slov??nie</option>
                                    <option value="SB">Les ??les Salomon</option>
                                    <option value="SO">Somalie</option>
                                    <option value="ZA">Afrique du Sud</option>
                                    <option value="GS">G??orgie du Sud et ??les Sandwich du Sud</option>
                                    <option value="SS">Soudan du sud</option>
                                    <option value="ES">Espagne</option>
                                    <option value="LK">Sri Lanka</option>
                                    <option value="SD">Soudan</option>
                                    <option value="SR">Suriname</option>
                                    <option value="SJ">Svalbard et Jan Mayen</option>
                                    <option value="SZ">Swaziland</option>
                                    <option value="SE">Su??de</option>
                                    <option value="CH">la Suisse</option>
                                    <option value="SY">R??publique arabe syrienne</option>
                                    <option value="TW">Taiwan, Province de Chine</option>
                                    <option value="TJ">Tadjikistan</option>
                                    <option value="TZ">Tanzanie, R??publique-Unie de</option>
                                    <option value="TH">Tha??lande</option>
                                    <option value="TL">Timor-Leste</option>
                                    <option value="TG">Aller</option>
                                    <option value="TK">Tokelau</option>
                                    <option value="TO">Tonga</option>
                                    <option value="TT">Trinit??-et-Tobago</option>
                                    <option value="TN">Tunisie</option>
                                    <option value="TR">dinde</option>
                                    <option value="TM">Turkm??nistan</option>
                                    <option value="TC">??les Turques-et-Ca??ques</option>
                                    <option value="TV">Tuvalu</option>
                                    <option value="UG">Ouganda</option>
                                    <option value="UA">Ukraine</option>
                                    <option value="AE">Emirats Arabes Unis</option>
                                    <option value="GB">Royaume-Uni</option>
                                    <option value="US">??tats-Unis</option>
                                    <option value="UM">??les mineures ??loign??es des ??tats-Unis</option>
                                    <option value="UY">Uruguay</option>
                                    <option value="UZ">Ouzb??kistan</option>
                                    <option value="VU">Vanuatu</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="VN">Viet Nam</option>
                                    <option value="VG">??les Vierges britanniques</option>
                                    <option value="VI">??les Vierges am??ricaines, ??tats-Unis</option>
                                    <option value="WF">Wallis et Futuna</option>
                                    <option value="EH">Sahara occidental</option>
                                    <option value="YE">Y??men</option>
                                    <option value="ZM">Zambie</option>
                                    <option value="ZW">Zimbabwe</option>
                                </Select>
                            </Stack>
                            <div className="city-cp-check">
                                <div><label for="city" className="this-label">ville</label>
                                    <Input name="city" value={city} variant="flushed" required placeholder="Votre ville" onChange={(e) => setCity(e.target.value)} id="city" /></div>
                                <div><label for="Code postal" className="this-label" >code postale</label>
                                    <Input name="postalCode" value={postalCode} variant="flushed" required placeholder="Votre code postal" id="zip" onChange={(e) => setPostalCode(e.target.value)} /></div>
                            </div>
                            <div>
                                <div><label for="Phone number" className="this-label" >Numero de telephone <span className="required">*</span></label>
                                    <Input name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} variant="flushed" required type="number" placeholder='telephone' />
                                </div>
                                <div><label for="Email" className="this-label" >E-mail </label>
                                    <Input name="email" value={email} onChange={(e) => setEmail(e.target.value)} variant="flushed" required type="email" placeholder='E-mail' />
                                </div>
                                <div><label for="Description" className="this-label" >Autres d??tails</label>
                                    <textarea
                                        value={description} onChange={(e) => setDescription(e.target.value)}
                                        style={{ width: "100%", margin: 10, backgroundColor: "#FBFBFB", resize: "none", border: "solid 1px #cececece" }} >
                                    </textarea>
                                </div>
                                <Input type="submit" value="passer la commande" style={{ margin: 15, border: "solid 1px #cecece", cursor: "pointer", backgroundColor: '#0071DC', color: "white", fontWeight: "bold", borderRadius: 20 }} />
                            </div>
                        </div>
                    </form>
                    <div class="your-products">
                        {cart.cartItems.length === 0 ? <h1> <RiShoppingCart2Line size="29" />Panier(0)</h1> :
                            <>
                                <h1> <RiShoppingCart2Line size="29" />Panier({cart.cartItems.length})</h1>
                                <div className="cart-summ">
                                    {cart.cartItems.map((item, index) => (
                                        <div style={{
                                            curFvsor: "pointer",
                                            marginBottom: 10
                                        }}
                                            key={index}
                                            onClick={() => {
                                                navigate(`/cart/`)
                                            }}
                                        >
                                            <div style={{
                                                display: "flex", flexDirection: "row", justifyContent: "space-between",
                                                marginBottom: 10
                                            }}>
                                                <div style={{ display: "flex", flexDirection: "row" }}>
                                                    <span>
                                                        {item.qty} X
                                                    </span>
                                                    {item.name + " (" + item.size + ") "}
                                                </div>
                                                <ColorBullet size={20} color={item.color} style={{ marginLeft: 25 }} />
                                            </div>
                                            <b>{item.qty * item.price}dt</b>
                                        </div>
                                    ))}
                                </div>
                            </>
                        }
                        <div 
                        className='checkout-note'
                        style={{
                            display: "inline-block",
                            color: "#CC4528AA",
                            fontWeight: 600,
                            borderStyle: "double",
                            borderWidth: 3,
                            borderColor: "#CC4528",
                            fontSize: 16,
                            padding: 15,
                            marginTop: 25,
                            width: 400,
                            backgroundColor: "#CC452822",
                            cursor: "pointer"
                        }}
                            onClick={
                                () => navigate("./delivery")
                            }
                        >
                            Les frais d'exp??dition et de livraison s'appliqueront en plus du co??t des articles vendus, veuillez lire les d??tails correspondants en cliquant <u>ici</u>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Checkout

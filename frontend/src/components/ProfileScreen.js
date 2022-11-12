import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Form, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import avatarRegister from './img/avatarRegister.svg'
import addUs from './img/new.svg'
import wave from './img/wavev.png'
import { Helmet } from 'react-helmet';
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { IoIosArrowDown } from 'react-icons/io';
import HashLoader from "react-spinners/HashLoader";

import {useNavigate} from 'react-router-dom'


import {
  Button, Input, Table, Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react"
import { AiOutlineEdit } from 'react-icons/ai'
import {  useLocation } from 'react-router-dom'

const ProfileScreen = () => {
  const [name, setName] = useState('');
  

  
  const location  = useLocation()

  function getQueryVariable(variable) {
    var query = location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}
const showOrdersPram = getQueryVariable("showOrders")
  const orderMylist = useSelector(state => state.orderMylist)
  const { loading: loadingOrders, error: errorOrders, orders } = orderMylist
  const [ShowOrders, setShowOrders] = useState(showOrdersPram ==="true" );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [isEditablename, setisEditablename] = useState(false);
  const [isEditableemail, setisEditableemail] = useState(false);
  const nameinput = useRef(null);
  const emailinput = useRef(null);
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { error, user } = userDetails
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const { success } = userUpdateProfile
  let navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      if (!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
    dispatch(listMyOrders())
  }, [dispatch, userInfo, user])
  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Le mot de passe ne correspond pas')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }
  const inputs = document.querySelectorAll(".inputa");
  function addcl() {
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  function remcl() {
    let parent = this.parentNode.parentNode;
    if (this.value == "") {
      parent.classList.remove("focus");
    }
  }
  const nameinputfocus = () => {
    setisEditablename(!isEditablename)
    if (isEditablename) {
      nameinput.current.focus()
    } else {

    }
  }
  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  const handelshow = () => {

  }
  return (
    <div className="registerSc">
      <Helmet>
        <title>Profile</title>
      </Helmet>
      <Image className="wave" src={wave} />
      <div className="containera">
        <div className="imga">
          <Image src={addUs} />
        </div>
        <div className='rightinfos'>
          <div className='showbtn' onClick={() => setShowOrders(!ShowOrders)}>{ShowOrders ? 'Afficher mes informations' : 'Afficher mes commandes'} <IoIosArrowDown /></div>
          <>
            {!ShowOrders ?
              <div className='login-content'>
                <form onSubmit={submitHandler}>
                  <Image src={avatarRegister} />
                  {error && <h4>{error}</h4>}
                  {success && <h4>Profil mis à jour</h4>}
                  <div className="input-div zz">
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <input type="text" value={name} readOnly={isEditablename} ref={nameinput} className="inputa" placeholder="Entrez le nom" onChange={(e) => setName(e.target.value)} />
                    </div>
                  </div>
                  <AiOutlineEdit size='26' className='edit' onClick={nameinputfocus} />
                  <div className="input-div one">
                    <div className="i">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div className="div">
                      <input type="text" value={email} readOnly={isEditableemail} ref={emailinput} className="inputa" placeholder="Entrez le email" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                  </div>
                  <AiOutlineEdit size='26' className='edit' onClick={() => {
                    setisEditableemail(!isEditableemail)
                    emailinput.current.focus()
                  }} />
                  <div className="input-div pass">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">

                      <input type="password" value={password} required className="inputa" placeholder="Entrez le mot de passe" onChange={(e) => setPassword(e.target.value)} />
                    </div>
                  </div>
                  <div className="input-div passconf">
                    <div className="i">
                      <i className="fas fa-lock"></i>
                    </div>
                    <div className="div">
                      <input type="password" value={confirmPassword} className="inputa" placeholder="Confirmez le mot de passe" onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                  </div>
                  {message && <h4 className='Message'>{message}</h4>}
                  <input type="submit" className="btna2" value="Mettre à jour" />
                </form>
              </div>
              :
              <div className='tableorder'>
                {loadingOrders ? <div className='loading'>
                  <HashLoader color={"#fff"} loading={loadingOrders} size={40} />
                </div> : errorOrders ? <h1>{errorOrders}</h1>
                  :
                  <Table size="sm">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>DATE</Th>
                        <Th>TOTAL</Th>
                        <Th>PAYÉ</Th>
                        <Th>LIVRÉ</Th>
                        <Th>Action</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {orders.map(order => (
                        <Tr key={order._id}>
                          <Td>{order._id}</Td>
                          <Td>{order.createdAt.substring(0, 10)}</Td>
                          <Td>{order.totalPrice}</Td>
                          <Td>{order.isPaid ? order.paidAt.substring(0, 10) : 'Pas encore payé'}</Td>
                          <Td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : 'Pas encore'}</Td>
                          <Td>
                            <Link to={`/order/${order._id}`}>
                              <Button size="xs">DETAILS</Button>
                            </Link>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                }
              </div>
            }
          </>
        </div>
      </div>
    </div>
  )
}

export default ProfileScreen

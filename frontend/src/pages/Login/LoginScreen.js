import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import { Helmet } from 'react-helmet';

import {Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {BsArrowRight} from "react-icons/bs"
import avatar from './img/avatare.svg'
import login from '../../actions/userActions'
import login_svg from './img/login.svg'
import wave from './img/wavev.png'
import './logincss.css'

import {useNavigate} from 'react-router-dom'



const LoginScreen = ({ history}) => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
   
  const location  = useLocation()
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)

  const { error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'

  const navigate = useNavigate();
  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(email, password))
  }

  const inputs = document.querySelectorAll(".inputa");


  function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  
  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }
  
  
  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  




    return (
        <div>
          <Helmet>
            <title>Login</title>

          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={"https://i.ibb.co/Sscpqfp/login.png"} />
		</div>
		<div className="login-content">
			<form onSubmit={submitHandler}>
			<h1> S'identifier</h1>
				{error && <h4>{error}</h4>}
           		<div className="input-div one">
           		   <div className="i">
                     <i class="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">	
           		   		<input type="text" value={email} className="inputa" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} />
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	<input type="password" value={password} className="inputa" placeholder="Mot de passe" onChange={(e) => setPassword(e.target.value)}/>
            	   </div>
            	</div>
            	
            	<input type="submit" className="btna" value="S'identifier" />
          
              <Link className="createAcc" to={redirect ? `/register?redirect=${redirect}` : '/register'}>Créez votre compte <BsArrowRight size="25"/></Link>
             
            </form>
        </div>
    </div>
        </div>
    )
}

export default LoginScreen

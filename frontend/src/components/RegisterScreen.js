import React, {useState, useEffect} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import avatarRegister from './img/avatarRegister.svg'
import login from '../actions/userActions'
import { Helmet } from 'react-helmet';
import addUs from './img/new.svg'
import wave from './img/wavev.png'
import {register} from '../actions/userActions'

import {useNavigate} from 'react-router-dom'

import {
  Button, Input
} from "@chakra-ui/react"


const RegisterScreen = () => {
    const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [message,setMessage] = useState(null) 

  
  
  const location  = useLocation()
  
  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const { error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  let navigate = useNavigate();

  useEffect(() => {
    if(userInfo) {
      navigate(redirect)
    }
  }, [userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})')
    if(strongPassword.test(password)){
      if(password !== confirmPassword){
        setMessage('Le mot de passe ne correspond pas')
    }
    else{
        dispatch(register(name, email, password))
    }
    }else{
      setMessage('Le mot de passe doit comporter au moins 8 caractères et doit comporter au moins une majuscule, une minuscule et un caractère numérique .')
    }
   
    
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
        <div className="registerSc">
          <Helmet>
            <title>
              Register
            </title>
          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={addUs} />
		</div>
		<div className="login-content">
			<form onSubmit={submitHandler}>
				<Image src={avatarRegister} />
				{error && <h4>{error}</h4>}
                <div className="input-div zz">
                       <div className="i">
           		   		<i className="fas fa-user"></i>
           		   </div>
                   <div className="div">
           		   		
           		   		<input type="text" value={name} className="inputa" placeholder="Entrez le nom"  onChange={(e) => setName(e.target.value)}/>
           		   </div>

           		   
           		</div>




           		<div className="input-div one">
                       

           		   <div className="i">
           		   		<i className="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input type="text" value={email} className="inputa" placeholder="Entrer l'e-mail" onChange={(e) => setEmail(e.target.value)} />
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={password} className="inputa" placeholder="Entrer le mot de passe" onChange={(e) => setPassword(e.target.value)}/>
            	   </div>
            	</div>


                <div className="input-div passconf">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={confirmPassword} className="inputa" placeholder="Confirmez le mot de passe" onChange={(e) => setConfirmPassword(e.target.value)}/>
            	   </div>
            	</div>
                {message && <h4>{message}</h4>}
                <input type="submit" className="btna2" value="créer un compte"/>
                <br />
                Avez vous déjà un compte? {' '}
            	<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Connetez vous</Link>
            </form>
        </div>
    </div>
        </div>
    )
}

export default RegisterScreen

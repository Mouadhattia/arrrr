import React, {useState, useEffect,useRef} from 'react'
import {Link, useParams} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import {getUserDetails,updateUser} from '../../actions/userActions'
import { AiOutlineUser } from 'react-icons/ai';
import { HiOutlineMail } from 'react-icons/hi';
import { IoIosArrowDown } from 'react-icons/io';
import HashLoader from "react-spinners/HashLoader";
import './Edituser.css'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import { Checkbox } from '@chakra-ui/checkbox'
import {  USER_UPDATE_RESET } from '../../constants/userConstants';
import { Helmet } from 'react-helmet';

import {useNavigate} from 'react-router-dom'

const Edituser = ({match,history}) => {
    const {id} = useParams()
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [isAdmin,setisAdmin] = useState(false)
    const [message,setMessage] = useState(null) 

    const dispatch = useDispatch()

    const userDetails = useSelector(state => state.userDetails)
  
    const { loading,error, user } = userDetails

    const navigate = useNavigate();

    const userUpdate = useSelector(state => state.userUpdate)
  
    const { loading:loadingUpdate,error:errorUpdate, success:successUpdate } = userUpdate

    useEffect(() => {
      if(successUpdate){
        dispatch({type: USER_UPDATE_RESET})
        navigate('/admin/userlist')
      }else{
        if(!user.name || user._id !== id){
          dispatch(getUserDetails(id))
        }else{
          setName(user.name)
          setEmail(user.email)
          setisAdmin(user.isAdmin)
        }
      }
       
        return () => {
        }
    }, [dispatch,id,history,user,successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({_id: id,name,email,isAdmin}))
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
        <div className = 'Edituser'>
          <Helmet>
            <title>Modifier l'utilisateur</title>
          </Helmet>
               {error || errorUpdate && <h4>{error || errorUpdate}</h4>}
               {successUpdate && <h4>Profile Updated</h4>}
               {loading || loadingUpdate ? 
                        <div className='loading'>
                            <HashLoader   color={"#1e1e2c"}  loading={loading || loadingUpdate} size={40} />
                        </div>
                
                : error ? <h4>{error}</h4> :
          <div>
            <h4 className = 'Edittitle'>Edit User :</h4>
            <div className ='formedit'>
            		<form onSubmit={submitHandler}>

                <div >
                <div className="input-div zz">
                   <div className="div">
                   <InputGroup>
                      <Input type="text" value={name}  placeholder="Entrez le nom"  onChange={(e) => setName(e.target.value)}/>
                      <InputRightElement children={<AiOutlineUser/>} />
                   </InputGroup>
           		   </div>
           		</div>
           		<div className="input-div one">
           		   <div className="div">
           		   		<InputGroup>
                              <Input  type="email" value={email} placeholder="Entrer l'e-mail" onChange={(e) => setEmail(e.target.value)} />
                              <InputRightElement children={<HiOutlineMail/>} />
                         </InputGroup>
           		   </div>
           		</div>
           		<div className="input-div pass">
           		   <div className="div">
           		    	<Checkbox isChecked={isAdmin} onChange = {(e)=>{setisAdmin(e.target.checked) ; console.log(e.target.checked)}}>Admin</Checkbox>
            	   </div>
            	</div>
                {message && <h4 className = 'Message'>{message}</h4>}
                <input type="submit" className="btna2" value="Mettre à jour"/>
                </div>
            </form>
            </div>
            </div>
}
        </div>
    )
}

export default Edituser

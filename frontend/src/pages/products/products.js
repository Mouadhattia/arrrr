import React,{useEffect} from 'react'
import { DeleteProduct, listProducts,CreateProduct} from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import HashLoader from "react-spinners/HashLoader";
import { PRODUCT_CREATE_RESET } from '../../constants/productConstants';
import './products.css'
import {
    Button, Table,  Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Stack,
    Box,
  } from "@chakra-ui/react"
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import { CgAdd } from 'react-icons/cg';
import { Helmet } from 'react-helmet';

import {useNavigate} from 'react-router-dom'

const Products = ({history,match}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {loading,error,products} = productList

    const productDelete = useSelector(state => state.productDelete)
    const {loading:loadingDelete,error:errorDelete,success:successDelete} = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const {loading:loadingCreate,error:errorCreate,success:successCreate,product:createdproduct} = productCreate

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const navigate = useNavigate();

    useEffect(()=>{
        dispatch({type : PRODUCT_CREATE_RESET})

        if(!userInfo.isAdmin){
            navigate('/login')
        }
        if(successCreate){
            navigate(`/admin/product/${createdproduct._id}/edit`)
        }else{
            dispatch(listProducts())

        }
    },[dispatch,history,userInfo,successDelete,successCreate,createdproduct])
    const deletehandler = (id) =>{
        if(window.confirm('Are You Sure?')){
            dispatch(DeleteProduct(id))

        }
    }

    const createproducthandler = () =>{
        dispatch(CreateProduct())
    }
    return (

        <div className = 'Users'>
            <Helmet>
                <title>Produits</title>
            </Helmet>
        <h1 className = 'titlepanel'> Produits :</h1>
        {loading || loadingDelete || loadingCreate ?  <div className='loading'>
                     <HashLoader   color={"#1e1e2c"}  loading={loading || loadingDelete || loadingCreate} size={40} />
                   </div> : 
                   error || errorDelete || errorCreate  ? <h1>{error || errorDelete || errorCreate}</h1> :
                   <>
                                      <Button leftIcon = {<CgAdd size = '20' />} className = 'ADDBUTTON' colorScheme ='blue' onClick = {createproducthandler}>Ajouter</Button>

                   <Box overflowX = 'auto'>
                   <Table  className = 'productusers' variant="striped">
                       <Thead>
                        <Tr>
                            <Th w = '10%'>ID</Th>
                            <Th  w = '20%'>Nom</Th>
                            <Th   w = '20%'>Prix</Th>
                            <Th  w = '20%'>Catégorie(s)</Th>
                            <Th  w = '10%'></Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                            {products.map(product =>(
                                <Tr key = {product._id}>
                                    <Td>{product._id}</Td>
                                    <Td>{product.name}</Td>
                                    <Td isNumeric>{product.price}</Td>
                                    <Td>{product.category.join(' | ')}</Td>
                                    <Td>
                                        <Stack>
                                        <Link to ={ `/admin/product/${product._id}/edit`}>
                                             <Button leftIcon = {<AiOutlineEdit size = '16' />} colorScheme ='blue' size="xs"  >MODIFIER</Button>
                                        </Link>
                                             <Button colorScheme ='red' leftIcon = {<AiFillDelete size = '16' />} size="xs" onClick= {()=>{deletehandler(product._id)}}>SUPPRIMER</Button>
                                        </Stack>
                                    </Td>
                                </Tr>
                            ))}
                      </Tbody>
                    </Table>
                    </Box>
                   </>
                }
            
        </div>
    )
}

export default Products

import { Input, InputGroup, InputRightElement } from '@chakra-ui/input'
import React, { useState } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import { MdSearch } from 'react-icons/md'

import {useNavigate} from 'react-router-dom'

const Searchnav = ({history,onBlur}) => {
    const [keyword, setkeyword] = useState('')
    let navigate = useNavigate();

    const Handlesearch = (e) => {
        if(keyword.trim() && e.which == 13){
            navigate(`/search/${keyword}`)
        }else{
        }
    }
    return (
        <InputGroup >
        <Input value = {keyword}
         onBlur={onBlur} onChange = {e=> setkeyword(e.target.value)} bgColor='white' placeholder='Cherchez ici ...'  onKeyPress = {Handlesearch} ></Input>
        <InputRightElement children={ <MdSearch/>} />
        </InputGroup>
    )
}

export default Searchnav

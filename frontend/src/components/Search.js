import React, { useState } from 'react'
import {Input} from '@chakra-ui/react'
 
import {useNavigate} from 'react-router-dom'
const Search = ({history}) => {
    const [keyword, setkeyword] = useState('')
    let navigate = useNavigate();
    const Handlesearch = (e) => {
        if(keyword.trim() && e.which == 13){
            navigate(`/search/${keyword}`)
        }else{
        }
    }
    return (
        <div className = 'Searcharea'>
        <Input size="lg" value = {keyword} onChange = {e=> setkeyword(e.target.value)} onKeyPress = {Handlesearch} bgColor  = 'white' placeholder="Appuyez pour rechercher" />
        </div>
    )
}
 
export default Search
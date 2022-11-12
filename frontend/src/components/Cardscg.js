import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
const Cardscg = ({ title }) => {
    const navigate = useNavigate();
    return (
        <div className="cardscg"
            onClick={() => {
                navigate(`/Shop/?cg=${title}`)
            }}
        >
            <h1>{title}</h1>
        </div>
    )
}

export default Cardscg

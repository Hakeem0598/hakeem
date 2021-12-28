import React from 'react'
import { useNavigate } from 'react-router-dom'

function PageNotFound() {
    const navigate = useNavigate();
    navigate('/');
    return <></>
}

export default PageNotFound

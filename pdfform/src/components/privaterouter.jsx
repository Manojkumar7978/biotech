import { Box } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export const PrivateRouter=({children})=>{
    let [token,setToken]=useState(localStorage.getItem("token")) //our token 
    let[verified,setVer]=useState(false)// token verified or not
    
       axios.get(`${process.env.REACT_APP_URL}/user`,{
            headers: {
                'Authorization': `Bearer ${token}` // Set the Authorization header with Bearer token
              }
        })
        .then((res)=>{
            setVer(true)
        })
        .catch((err)=>{
            setToken(null)
            setVer(true)
        })
        
    return (
        <Box>
            {
                verified ? 
                <>
                {
                    token===null ? <Navigate to={'/login'}/>
                    :
                    children
                }
                </>
                :
                <h1>Loading...</h1>
            }

        </Box>
    )
}
import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export const Home=()=>{
    const navigate=useNavigate()
    return (
        <Box
        position={'relative'}
        h={'100vh'}
        >
                        <Heading textAlign={'center'} mb={10}>Welcome to PDF Builder</Heading>

            <Button size={'lg'}
            colorScheme="blue"
            position={'absolute'}
            top={'50%'}
            left={'50%'}
            transform={'translate(-50%,-50%)'}
            onClick={()=>{
                navigate('/signup')
            }}
            >Create your Profile +</Button>
        </Box>
    )
}
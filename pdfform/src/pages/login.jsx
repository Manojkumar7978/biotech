import {
    Box, Button, chakra, Flex, FormControl,
    FormLabel, Heading, Input, InputGroup,
    InputRightElement, Stack, Text
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

// function for login to the form if user already exist
const signinForm=async (user)=>{
    try {
        let res=await axios.post(`${process.env.REACT_APP_URL}/signin`,user)
        return res.data
    } catch (error) {
        return error
    }
}
export const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        Email: null,
        Password: null
    })
    const toast=useToast()
    const showToast=(title,desc,status)=>{
        toast({
            title: title,
            description: desc,
            status: status,
            duration: 3000,
            isClosable: true,
            position:'top'
          })
    }
    const navigate = useNavigate()
    // function for sign in
    const handelSignin=()=>{
        signinForm(user)
        .then((res)=>{
            if(res.token){
                localStorage.setItem("token",res.token)
                showToast('Success', 'Login Successfully', 'success')
                navigate('/createprofile') //navigate to the profile page after sucessful login
                }else{
                    showToast('Error', 'Wrong userid/password.', 'error')
                    return
                }
        })
        .catch((err)=>{
            showToast('Error', 'Something went wrong', 'error')
        })
    }

    return (
        <Box>
            <Heading textAlign={'center'} mb={10}>Login to your Profile</Heading>
            <Box
               maxW="md"
               mx="auto"
               mt={8}
               rounded={'lg'}
               bg={'white'}
               boxShadow={'lg'}
               p={8}
            >
                <form
               onSubmit={(e)=>{
                e.preventDefault()
                handelSignin()
               }} 
                >
                    <Heading size={'md'} textAlign={'center'} mb={4}>Sign In</Heading>
                    <FormControl isRequired>
                        <FormLabel>Email Address</FormLabel>
                        <Input
                            onChange={(e) => {
                                setUser({
                                    ...user,
                                    Email:e.target.value
                                })
                            }}
                            placeholder='Email' type="email" />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input
                                onChange={(e) => {
                                    setUser({
                                        ...user,
                                        Password:e.target.value
                                    })
                                }}
                                placeholder="Password"
                                type={showPassword ? 'text' : 'password'} />
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Input type="submit"
                        mt={8}
                        value={'Sign In'}
                        cursor={"pointer"}
                        bg={'blue'} color={'white'} />
                </form>
                <Stack pt={6}>
                    <Text align={'center'}>
                        Don't have account? <chakra.span color={'blue.400'}
                            onClick={() => {
                                navigate('/signup')
                            }}
                        ><Link >Sign Up</Link> </chakra.span>
                    </Text>
                </Stack>
            </Box>

        </Box>
    )
}
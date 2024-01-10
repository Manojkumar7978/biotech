import {
  Box, Button, chakra, Flex, FormControl,
  FormLabel, Heading, Input, InputGroup,
  InputRightElement, Stack, Text, useToast
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

// api post request for create user creadantial 
const CreateAccount = async (user) => {
  try {
    let res = await axios.post(`http://localhost:8080/signup`, user)
    return res.data
  } catch (error) {
    return error
  }
}

export const Signup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const [user, setUser] = useState({
    Email: null,
    Password: null
  })
  const toast = useToast()
  const showToast = (title, desc, status) => {
    toast({
      title: title,
      description: desc,
      status: status,
      duration: 5000,
      isClosable: true,
      position: 'top'
    })
  }

  // function for email validation
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // validation for password
  function validateStrongPassword(password) {
    if (password.length < 8) {
      return false;
    }
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()\-_=+{};:,<.>]/.test(password);

    if (!(hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar)) {
      return false;
    }

    return true;
  }

  // sign up form submission
  const formSubmission = () => {
    if (!validateEmail(user.Email)) {
      showToast('wrong email', 'Enter Correct Email Address', 'warning')
      return
    }
    if (!validateStrongPassword(user.Password)) {
      showToast('Please Enter a Stronger Password', `
      (with One Capital letter,Special character,Small letter,number & Min 8 character)
      `, 'info')
      return
    }
    CreateAccount(user)
      .then((res) => {
        showToast('Success', 'User Created Successfully', 'success')
        if (res === 'User Created Sucessfully.') {
          navigate('/login')
        } else {
          return
        }

      })
      .catch((err) => {
        showToast('Error', 'Something went wrong', 'error')
      })
  }

  return (
    <Box>
      <Heading textAlign={'center'} mb={10}>Create Your Profile</Heading>
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
          onSubmit={(e) => {
            e.preventDefault()
            formSubmission()
          }}
        >
          <Heading size={'md'} textAlign={'center'} mb={4}>Sign Up</Heading>
          <FormControl isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input
              onChange={(e) => {
                setUser({
                  ...user,
                  Email: e.target.value
                })
              }}
              placeholder='Email' type="email" />
          </FormControl>
          <FormControl mt={4} isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input placeholder="Password"
                onChange={(e) => {
                  setUser({
                    ...user,
                    Password: e.target.value
                  })
                }}
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
            value={'Sign Up'}
            cursor={"pointer"}
            bg={'blue'} color={'white'} />
        </form>
        <Stack pt={6}>
          <Text align={'center'}>
            Already a user? <chakra.span color={'blue.400'}
              onClick={() => {
                navigate('/login')
              }}
            ><Link >Login</Link> </chakra.span>
          </Text>
        </Stack>
      </Box></Box>
  )
}
import { Box, Button, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const getUserData=async (id)=>{
  try {
    const config = {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
      }
  };
    let res=await axios.get(`http://localhost:8080/data/${id}`,config)
    return res.data
  } catch (error) {
    return error
  }
}

export const Preview = () => {
 let {id}=useParams()
 const [data,setDat]=useState({
  Name:"",
  Age:"",
  Address:"",
  Photo:""
 })
 useEffect(()=>{
  getUserData(id)
  .then((res)=>{
    setDat({...res})
  })
  
 },[])
  return (
    <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" boxShadow="md">
      <VStack spacing={4}>
        <Image src={`http://localhost:8080/uploads/${data.Photo}`} alt="Avatar" borderRadius="full" boxSize="150px" />

        <Text fontSize="xl" fontWeight="bold">
         Name: {data.Name}
        </Text>

        <Text fontSize="md">Age: {data.Age}</Text>
        <Text fontSize="md">Address: {data.Address}</Text>

        <Button colorScheme="blue" >
          Download PDF
        </Button>
      </VStack>
    </Box>
  );
};


import { Box, Button, ButtonGroup, Image, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';


//function to get user data
const getUserData=async (id)=>{
  try {
    const config = {
      headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
      }
  };
    let res=await axios.get(`http://localhost:8080/data/${id}`,config)
    console.log(res)
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
 const navigate=useNavigate()

 //function to download the user data on click button
 const downloadPDF = () => {

  const doc = new jsPDF();

  doc.text(`Name: ${data.Name}`, 10, 10);
  doc.text(`Age: ${data.Age}`, 10, 20);
  doc.text(`Address: ${data.Address}`, 10, 30);

  // Add the user's photo to the PDF
  let src =   `http://localhost:8080/uploads/${data.Photo}`;
  if(src)
  doc.addImage(src, 'JPEG', 10, 40, 80, 80);
  doc.save('pdfform.pdf')
};

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

        <ButtonGroup>
        <Button colorScheme="blue" onClick={downloadPDF} >
          Download PDF
        </Button>
          
        <Button colorScheme="blue" onClick={()=>{
          localStorage.removeItem("token")
          navigate('/login')
        }} >
          Logout
        </Button>
        </ButtonGroup>
      </VStack>
    </Box>
  );
};


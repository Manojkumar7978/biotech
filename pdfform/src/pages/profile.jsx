import {
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Heading,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// save user data in to the backend
const exportUserData = async (data, token) => {
    try {
        const formData = new FormData();
        formData.append('Name', data.Name);
        formData.append('Age', data.Age);
        formData.append('Address', data.Address);
        formData.append('file', data.Photo); 

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            }
        };

        // Send the request using axios
        const response = await axios.post(`${process.env.REACT_APP_URL}/userData`, formData, config);
        console.log(response)
        return response.data;
    } catch (error) {
        return error;
    }
};

export const Profile = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Age: '',
        Address: '',
       Photo: '',
    });
    const navigate=useNavigate()

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

    // change the formdata on input details
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
       
        setFormData({
            ...formData,
            Photo: file,
        });
    };
    
    //fuction for form validation
    function validateForm() {
        const ageNumber = Number(formData.Age);
      
        // Check if name is not empty and contains only letters and spaces
        const nameRegex = /^[A-Za-z\s]+$/;
        const isNameValid = formData.Name && nameRegex.test(formData.Name);
      
        // Check if age is a number between 1 and 120
        const isAgeValid = !isNaN(ageNumber) && ageNumber > 0 && ageNumber <= 120;
      
        // Check if address is not empty
        const isAddressValid = formData.Address.trim() !== '';
      
        // Check if a photo file is selected
        const isPhotoValid = !!formData.Photo;
      
        return isNameValid && isAgeValid && isAddressValid && isPhotoValid;
      }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(validateForm()){
            exportUserData(formData,localStorage.getItem("token"))
        .then((res)=>{
            showToast('Success', 'Profile created Successfully', 'success')
 
            navigate(`/preview/${res._id}`)
        })
        }else{
            showToast('', 'Input correct details.', 'info')
        }
    };

    return (
        <Box>
            <Heading textAlign={'center'}
             mb={10}>Enter Your Personal Details</Heading>

            <Box maxW="md"
                mx="auto"
                mt={8}
                rounded={'lg'}
                bg={'white'}
                boxShadow={'lg'}
                p={8}
            >
                <form onSubmit={handleSubmit}>
                    <FormControl id="name" mb={4}>
                        <FormLabel>Name</FormLabel>
                        <Input type="text" name="Name" defaultValue={formData.Name} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="age" mb={4}>
                        <FormLabel>Age</FormLabel>
                        <Input type="number" name="Age" defaultValue={formData.Age} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="address" mb={4}>
                        <FormLabel>Address</FormLabel>
                        <Input type="text" name="Address" defaultValue={formData.Address} onChange={handleChange} />
                    </FormControl>
                    <FormControl id="photo" mb={4}>
                        <FormLabel>Photo</FormLabel>
                        <Input type="file" name="Photo" accept="image/*" onChange={handlePhotoChange} />
                        <FormHelperText>Upload a photo</FormHelperText>
                    </FormControl>
                    <Button type="submit" colorScheme="blue">Submit</Button>
                </form>
            </Box>
        </Box>
    )
}





import {
    Box,
    Input,
    Button,
    FormControl,
    FormLabel,
    FormHelperText,
    Heading
} from '@chakra-ui/react';
import axios from 'axios';
import { useState } from "react";
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
        const response = await axios.post('http://localhost:8080/userData', formData, config);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
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
    

    const handleSubmit = (e) => {
        e.preventDefault();
        exportUserData(formData,localStorage.getItem("token"))
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




 // const reader = new FileReader();
        // reader.file=file
        
        // reader.onload = () => {
        //     const photoURL = reader.result; 
        //     console.log(photoURL); 
    
           
        // };
    
        // reader.readAsDataURL(file);
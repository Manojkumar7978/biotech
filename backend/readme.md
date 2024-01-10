# Pdf Builder

## Description
Pdf Builder is a web application that allows users to sign up or sign in to their account using a unique user ID and password. Once logged in, users can update their profile details, including adding an image, previewing their profile information, and downloading it in PDF format.

## Link
[Demo Link](https://biotech-he6d.vercel.app/)

## Tech Stacks (backend)
- Node
- Express
- Mongodb
- Multer (for image upload)
- Mongoose
- JWT (for authontication) 


Certainly! Here are the formats to use the APIs you've described:

##How to use APIs

### Signup:

- **Endpoint:** `POST /signup`
- **Request Body Format:**
  ```json
  {
    "Email": "user@example.com",
    "Password": "userpassword"
  }
  ```
- **Response Format (Success):**
  ```json
  "User Created Successfully."
  ```
- **Response Format (Error - User already registered):**
  ```json
  "User already registered."
  ```

### Signin:

- **Endpoint:** `POST /signin`
- **Request Body Format:**
  ```json
  {
    "Email": "user@example.com",
    "Password": "userpassword"
  }
  ```
- **Response Format (Success):**
  ```json
  {
    "token": "JWT_TOKEN",
    "userDetails": {
      // User details here
    }
  }
  ```
- **Response Format (Error - User not registered):**
  ```json
  "User not registered."
  ```

### Get User Data:

- **Endpoint:** `GET /user`
- **Header:**
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response Format (Success):**
  ```json
  {
    // User details here
  }
  ```
- **Response Format (Error):**
  This might return an error message if the token is invalid or expired.

### Post User Information:

- **Endpoint:** `POST /userData`
- **Header:**
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Request Body Format (FormData):**
  ```
  Name: "User Name",
  Age: "25",
  Address: "User Address",
  Photo: (file) // File to be uploaded
  ```
- **Response Format (Success):**
  ```json
  {
    // Saved user data
  }
  ```
- **Response Format (Error):**
  This might return an error message if something goes wrong during the upload or database operation.

### Get User Data by ID:

- **Endpoint:** `GET /data/:id`
- **Header:**
  ```
  Authorization: Bearer YOUR_JWT_TOKEN
  ```
- **Response Format (Success):**
  ```json
  {
    // User data with the specified ID
  }
  ```
- **Response Format (Error):**
  This might return an error message if the ID doesn't exist or if there's an issue with the authentication.

### Static Uploads:

- **Base URL:** `/uploads`
- This endpoint serves static files uploaded to the server. The files can be accessed directly via the browser using the appropriate file path.



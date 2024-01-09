import React from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Login } from "../pages/login";

export const Router=()=>{
    return (
        <Routes>
           <Route path="/signup" element={<Signup/> }/>
           <Route path="/login" element={<Login/> }/>

        </Routes>
    )
}
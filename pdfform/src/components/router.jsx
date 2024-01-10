import React from "react";
import { Route, Routes } from "react-router-dom";
import { Signup } from "../pages/signup";
import { Login } from "../pages/login";
import { Profile } from "../pages/profile";
import { PrivateRouter } from "./privaterouter";
import { Home } from "../pages/home";
import { Preview } from "../pages/preview";

export const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/createprofile" element={
                <PrivateRouter>
                    <Profile />
                </PrivateRouter>

            } />
            <Route path="/preview/:id" element={
                <PrivateRouter>
                    <Preview/>
                </PrivateRouter>
            }/>
        </Routes>
    )
}
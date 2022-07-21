import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardPage from '../Pages/DashboardPage';
import LoginPage from '../Pages/LoginPage';
import SignUpPage from '../Pages/SignUpPage';
import { useSelector } from "react-redux";
import { userSelector } from '../Features/UserSlice';

const RoutesLink = () => {
    const userData = useSelector(userSelector);
    const isEmpty = Object.keys(userData.items).length === 0;
    return (
        <>
            <Routes>
                {(isEmpty)? <Route path='/' element={<LoginPage />} /> :  <Route path='/' element={<DashboardPage />} />}
                <Route path='/signup' element={<SignUpPage />} />
            </Routes>
        </>
    )
}

export default RoutesLink
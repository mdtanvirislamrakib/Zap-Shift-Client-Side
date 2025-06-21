import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';

const RootLayout = () => {
    return (
        <div className=' bg-gray-100/45 pt-10 '>
            <div className='max-w-11/12 mx-auto'>
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>

        </div>
    );
};

export default RootLayout;
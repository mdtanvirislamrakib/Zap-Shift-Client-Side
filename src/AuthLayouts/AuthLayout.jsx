import React from 'react';
import { Outlet } from 'react-router';
import authImage from "../assets/authImage.png";

const AuthLayout = () => {
    return (
        <div className='flex w-full bg-white'>
            {/* Left: Auth Form (50%) */}
            <div className='w-full flex items-center justify-center p-8'>
                <div className='w-full'>
                    <Outlet />
                </div>
            </div>

            {/* Right: Illustration (50%) */}
            <div className='hidden md:flex items-center justify-center bg-gray-50 p-8'>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8">
                    <img
                        src={authImage}
                        alt="Authentication Illustration"
                        className="w-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;
import React from 'react';
import logo from "../../assets/logo.png"

const ProfastLogo = () => {
    return (
        <div className='flex items-end justify-start'>
            <img src={logo} alt="" className='mb-2' />
            <h2 className='text-2xl lg:text-4xl font-bold -ml-4'>ProFast</h2>
        </div>
    );
};

export default ProfastLogo;
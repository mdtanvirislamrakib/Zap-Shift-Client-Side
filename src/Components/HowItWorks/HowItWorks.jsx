import React from 'react';
import { CiDeliveryTruck } from "react-icons/ci";
import { BsCashCoin } from "react-icons/bs";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineDeliveryDining } from "react-icons/md";



const HowItWorks = () => {
    return (
        <div className='w-full lg:max-w-11/12 mx-auto mt-10'>
            <h1 className='text-2xl lg:text-4xl font-bold'>How It Works</h1>

            <div className='grid grid-cols-1 lg:grid-cols-4 gap-8 mt-10'>
                <div className='bg-gray-100 rounded-2xl px-8 py-4 drop-shadow-sm hover:scale-105 transition-all duration-150 space-y-6'>
                    <p><CiDeliveryTruck size={45} /></p>
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold'>Booking Pick & Drop</h3>
                        <p className='text-gray-800 text-sm'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                
                <div className='bg-gray-100 rounded-2xl px-8 py-4 drop-shadow-sm hover:scale-105 transition-all duration-150 space-y-6'>
                    <p><BsCashCoin size={45} /></p>
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold'>Cash On Delivery</h3>
                        <p className='text-gray-800 text-sm'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                <div className='bg-gray-100 rounded-2xl px-8 py-4 drop-shadow-sm hover:scale-105 transition-all duration-150 space-y-6'>
                    <p><TbTruckDelivery size={45} /></p>
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold'>Delivery Hub</h3>
                        <p className='text-gray-800 text-sm'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>
                <div className='bg-gray-100 rounded-2xl px-8 py-4 drop-shadow-sm hover:scale-105 transition-all duration-150 space-y-6'>
                    <p><MdOutlineDeliveryDining size={45} /></p>
                    <div className='space-y-4'>
                        <h3 className='text-xl font-bold'>Booking Pick & Drop</h3>
                        <p className='text-gray-800 text-sm'>From personal packages to business shipments — we deliver on time, every time.</p>
                    </div>
                </div>

            </div>
            
        </div>
    );
};

export default HowItWorks;
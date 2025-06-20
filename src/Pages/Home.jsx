import React from 'react';
import Banner from '../Components/Banner/Banner';
import OurServices from '../Components/OurServices/OurServices';
import HowItWorks from '../Components/HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
        </div>
    );
};

export default Home;
import React from 'react';
import Banner from '../Components/Banner/Banner';
import OurServices from '../Components/OurServices/OurServices';
import HowItWorks from '../Components/HowItWorks/HowItWorks';
import ClientSlider from '../Components/ClientSlider/ClientSlider';
import BenefitsSection from '../Components/FeatureCards/BenefitsSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientSlider></ClientSlider>
            <BenefitsSection></BenefitsSection>
        </div>
    );
};

export default Home;
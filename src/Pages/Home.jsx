import React from 'react';
import Banner from '../Components/Banner/Banner';
import OurServices from '../Components/OurServices/OurServices';
import HowItWorks from '../Components/HowItWorks/HowItWorks';
import ClientSlider from '../Components/ClientSlider/ClientSlider';
import BenefitsSection from '../Components/FeatureCards/BenefitsSection';
import BeMerchant from '../Components/BeMarchent/BeMarchent';
import CustomerReview from '../Components/CustomerReviews/CustomerReview';
import FaqSection from '../Components/FaqSection/FaqSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <OurServices></OurServices>
            <ClientSlider></ClientSlider>
            <BenefitsSection></BenefitsSection>
            <BeMerchant></BeMerchant>
            <CustomerReview></CustomerReview>
            <FaqSection></FaqSection>
        </div>
    );
};

export default Home;
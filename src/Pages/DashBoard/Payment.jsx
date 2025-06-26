import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe('pk_test_51ReKbrIros3mgqZXEpNfcjIYhCTfhnVb13KUycpM38F0QbNT79drtRZ7VOwqZFK5SCkPMxgfPUr9gOhawF8hFUPl006yn69M3l')

const Payment = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm></PaymentForm>
        </Elements>
    );
};

export default Payment;
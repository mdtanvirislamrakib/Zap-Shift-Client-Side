import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const {parcelId} = useParams()

    const axiosSecure = UseAxiosSecure()

    const [error, setError] = useState(null);


    const {isPending, data: parcelInfo = {}} = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async() => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data
        }
    })

    if(isPending) {
        return "...Loading...."
    }
    console.log(parcelInfo);

    const amount = parcelInfo?.delivery_cost;


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            console.error("Payment error:", error);
        } else {
            setError(null);
            console.log("Payment success:", paymentMethod);
            // You can proceed with your backend call here
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Parcel Pickup Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 border border-gray-300 rounded-md">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#32325d',
                                    '::placeholder': { color: '#a0aec0' },
                                },
                                invalid: {
                                    color: '#e53e3e',
                                },
                            },
                        }}
                    />
                </div>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                    Pay ৳{amount}
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;

import React from 'react';
import UseAuth from '../../../Hooks/UseAuth';
import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import Loader from '../../../Components/Loader/Loader';

const PaymentHistory = () => {
    const { user } = UseAuth();
    const axiosSecure = UseAxiosSecure();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`)
            return res.data
        }
    })
    if (isPending) {
        return <Loader></Loader>
    }
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Payment History</h2>

            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                <table className="table-auto w-full text-sm text-left border-collapse">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border">#</th>
                            <th className="px-4 py-2 border">Parcel ID</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Amount ($)</th>
                            <th className="px-4 py-2 border">Method</th>
                            <th className="px-4 py-2 border">Transaction ID</th>
                            <th className="px-4 py-2 border">Paid At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border">{index + 1}</td>
                                <td className="px-4 py-2 border text-blue-600 break-words">{payment.parcelId}</td>
                                <td className="px-4 py-2 border">{payment.email}</td>
                                <td className="px-4 py-2 border">${payment.amount}</td>
                                <td className="px-4 py-2 border capitalize">{payment.paymentMethod}</td>
                                <td className="px-4 py-2 border text-xs text-gray-600 break-words">{payment.transactionId}</td>
                                <td className="px-4 py-2 border">
                                    {new Date(payment.paid_at).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {payments.length === 0 && (
                    <p className="text-center py-4 text-gray-500">No payment history found.</p>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;
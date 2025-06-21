import React from "react";
import ProfastLogo from "../../Shared/ProFastLogo/ProfastLogo";

const Login = () => {
    return (
        <div className=" bg-white w-full">
            {/* Left: Login Form */}
            <div className="w-full flex flex-col justify-center px-8 md:px-24">
                {/* Logo */}
                <div className="mb-10">
                    <ProfastLogo></ProfastLogo>
                </div>
                {/* Welcome */}
                <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
                <p className="mb-7 text-gray-700">Login with Profast</p>
                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                            placeholder="Email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                            placeholder="Password"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Forgot Password?</span>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-lime-300 text-black rounded py-2 font-semibold mt-1 hover:bg-lime-400 transition"
                    >
                        Continue
                    </button>
                </form>
                <div className="mt-5 flex flex-col items-center">
                    <div className="text-sm text-gray-700 mb-1">
                        Don&apos;t have any account?{" "}
                        <a href="#" className="text-lime-600 font-semibold hover:underline">
                            Register
                        </a>
                    </div>
                    <div className="flex items-center my-2 w-full">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="mx-3 text-gray-400 text-sm">Or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>
                    <button
                        type="button"
                        className="w-full bg-gray-100 flex items-center justify-center gap-2 border border-gray-200 rounded py-2 text-sm font-medium hover:bg-gray-200 transition"
                    >
                        <img
                            src="https://www.svgrepo.com/show/475656/google-color.svg"
                            alt="Google"
                            className="h-5 w-5"
                        />
                        Login with google
                    </button>
                </div>
            </div>
            
        </div>
    );
};

export default Login;
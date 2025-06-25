import React from "react";
import ProfastLogo from "../../Shared/ProFastLogo/ProfastLogo";
import { Link, useLocation, useNavigate } from "react-router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";

const Registar = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const { createUser, loginWithGoogle } = UseAuth()

    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.pathname?.from || "/";


    const onSubmit = data => {
        console.log(data);
        createUser(data?.email, data?.password)
            .then(result => {
                console.log(result?.user);
                if(result?.user?.email) {
                    navigate(from)
                }

            })
            .catch(err => {
                console.log(err);
            })
    }


    // google login
    const handleGoogleLogin = () => {
        loginWithGoogle()
        .then(result => {
            console.log(result?.user);
        })
        .then(err => {
            console.log(err);
        })
    }




    return (
        <div className=" bg-white w-full">
            {/* Left: Login Form */}
            <div className="w-full flex flex-col justify-center px-8 md:px-24">
                {/* Logo */}
                <div className="mb-10">
                    <ProfastLogo></ProfastLogo>
                </div>
                {/* Welcome */}
                <h2 className="text-3xl font-bold mb-2">Create an Account</h2>
                <p className="mb-7 text-gray-700">Register with Profast</p>
                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                            placeholder="Email"
                        />
                        {errors.email?.type === "required" && (
                            <div role="alert" className="text-red-600 font-semibold flex gap-2 items-center mt-1">
                                <IoAlertCircleOutline size={15} />
                                <p>Email is required</p>
                            </div>
                        )}

                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })}
                            type="password"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                            placeholder="Password"
                        />

                        {errors.password?.type === "required" && (
                            <div role="alert" className="text-red-600 font-semibold flex gap-2 items-center mt-1">
                                <IoAlertCircleOutline size={15} />
                                <p>Password is required</p>
                            </div>
                        )}

                        {errors.password?.type === "minLength" && (
                            <div role="alert" className="text-red-600 font-semibold flex gap-2 items-center mt-1">
                                <IoAlertCircleOutline size={15} />
                                <p>Password must be 6 charecters</p>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <Link className="text-gray-500">Forgot Password?</Link>
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
                        Already have any account?{" "}
                        <Link to="/login" className="text-lime-600 font-semibold hover:underline">
                            Login
                        </Link>
                    </div>
                    <div className="flex items-center my-2 w-full">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="mx-3 text-gray-400 text-sm">Or</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>
                    <button
                        onClick={handleGoogleLogin}
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

export default Registar;
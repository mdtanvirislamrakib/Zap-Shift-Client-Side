import React, { useState } from "react";
import ProfastLogo from "../../Shared/ProFastLogo/ProfastLogo";
import { Link, useLocation, useNavigate } from "react-router";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import axios from "axios";
import UseAxios from "../../Hooks/UseAxios";

const Registar = () => {

    const { register, handleSubmit, formState: { errors }, } = useForm();

    const { createUser, loginWithGoogle, updateUserProfile } = UseAuth()

    const navigate = useNavigate();

    const location = useLocation();
    const from = location?.pathname?.from || "/";

    const [profilePic, setProfilePic] = useState("")

    const axiosInstance = UseAxios();

    const onSubmit = data => {
        console.log(data);
        createUser(data?.email, data?.password)
            .then(async result => {
                console.log(result?.user);
                if (result?.user?.email) {
                    navigate(from)

                    // update user info in DB
                    const userInfo = {
                        email: data?.email,
                        role: "user",            // default role
                        created_at: new Date().toISOString(),
                        last_login_at: new Date().toISOString(),
                    }

                    const userRes = await axiosInstance.post("/users", userInfo)

                    console.log("user Responce", userRes?.data);


                    // update user profile in DB
                    const userProfile = {
                        displayName: data?.name,
                        photoURL: profilePic
                    }


                    updateUserProfile(userProfile)
                        .then(() => {
                            console.log("Profile Name pic updated");
                        })
                        .catch(error => {
                            console.error(error)
                        })



                }

            })
            .catch(err => {
                console.log(err);
            })
    }


    // google login
    const handleGoogleLogin = () => {
        loginWithGoogle()
            .then(async result => {
                const user = result?.user
                console.log(result?.user);
                const usersInfo = {
                    email: user?.email,
                    role: "user",            // default role
                    created_at: new Date().toLocaleString(),
                    last_login_at: new Date().toLocaleString(),
                }
                const userRes = await axiosInstance.post("/users", usersInfo)
                console.log("user Responce", userRes?.data);
            })
            .then(err => {
                console.log(err);
            })
    }

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append("image", image)

        const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadUrl, formData)

        setProfilePic(res?.data?.data?.url);
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
                    {/* Name field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                            {...register("name", { required: true })}
                            type="text"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                            placeholder="Name"
                        />
                        {errors.email?.type === "required" && (
                            <div role="alert" className="text-red-600 font-semibold flex gap-2 items-center mt-1">
                                <IoAlertCircleOutline size={15} />
                                <p>name is required</p>
                            </div>
                        )}

                    </div>

                    {/* Image upload field */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Image</label>
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            className="w-full border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-lime-300"
                        />

                    </div>

                    {/* Email field */}
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

                    {/* Password Field */}
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
import React from 'react';
import { Link, NavLink } from 'react-router';
import ProfastLogo from '../../Shared/ProFastLogo/ProfastLogo';
import UseAuth from '../../Hooks/UseAuth';

const Navbar = () => {

    const { user, logout } = UseAuth()

    const navItems = <>
        <li><NavLink to={"/"}>Home</NavLink></li>
        <li><NavLink to={"/coverage"}>Coverage</NavLink></li>
        <li><NavLink to={"/sendParcel"}>Send a Parcel</NavLink></li>
        <li><NavLink to={"/about"}>About Us</NavLink></li>

        {
            user ? <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li> : ""
        }
        <li><NavLink to={"/beARider"}>Be a Rider</NavLink></li>
    </>

    const handleLogout = () => {
        logout()
    }

    return (

        <div className="navbar bg-base-100 shadow-sm rounded-2xl px-7">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {navItems}
                    </ul>
                </div>
                <ProfastLogo></ProfastLogo>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navItems}
                </ul>
            </div>
            {
                user ? <div className="navbar-end">
                    <img src={user?.photoURL} alt="" className='w-10 h-10 mr-6 rounded-full border-2' />
                    <button onClick={handleLogout} className="btn">Logout</button>
                </div> : <div className="navbar-end">
                    <Link to="/login" className="btn">Login</Link>
                </div>
            }

        </div>

    );
};

export default Navbar;
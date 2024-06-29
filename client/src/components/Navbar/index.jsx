import React from 'react'
import { SignInButton } from "@clerk/clerk-react";
function Navbar() {
    return (
        <nav className=" h-20 p-2 w-full flex justify-between items-center backdrop-blur-md max-w-screen-xl absolute z-50 top-0 rounded-3xl top-5  left-1/2 transform -translate-x-1/2  ">
            <div className=" flex items-center">
                <img src=".\images\black png.png" className=" h-16 w-16" alt="" />
                <span className=" text-xl font-semibold" >CloudBox</span>
            </div>

            <div className="flex items-center justify-evenly rounded-lg gap-4 bg-[#7b7b7b40] h-12 w-28 ">
                <button className="flex items-center gap-4">
                    <svg
                        fill="currentColor"
                        height="24"
                        role="img"
                        viewBox="0 -960 960 960"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                        title="Wallet"
                    >
                        <title>Wallet</title>
                        <path
                            d="M240-160q-66 0-113-47T80-320v-320q0-66 47-113t113-47h480q66 0 113 47t47 113v320q0 66-47 113t-113 47H240Zm0-480h480q22 0 42 5t38 16v-21q0-33-23.5-56.5T720-720H240q-33 0-56.5 23.5T160-640v21q18-11 38-16t42-5Zm-74 130 445 108q9 2 18 0t17-8l139-116q-11-15-28-24.5t-37-9.5H240q-26 0-45.5 13.5T166-510Z"
                        ></path>
                    </svg>
                    <p className=" font-semibold "><SignInButton>Sign In</SignInButton></p>
                </button>


            </div>
        </nav>
    )
}

export default Navbar
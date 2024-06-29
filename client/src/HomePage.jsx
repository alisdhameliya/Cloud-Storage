import { SignInButton } from "@clerk/clerk-react";
import { Button, Box, Typography } from "@mui/material";
import Navbar from "./components/Navbar";
function HomePage() {
    return (
        <div className=" w-screen h-screen bg-[#0f1010] text-white overflow-hidden">
            <Navbar />
            <div className=" w-full h-screen flex flex-col items-center leading-[130px] text-[7.8vw] mt-44 ">
                <div className=" h-[500px] w-[500px] rounded-full bg-gradient-to-br opacity-15 from-white to-black drop-shadow-[0px_0px_500px_] left-0  top-[40%] -translate-x-[50%] -translate-y-[50%] absolute"></div>
                <div className=" h-[0px] w-[0px] rounded-full shadow-[0px_0px_500px_50px_#4299e1]  absolute -bottom-10"></div>
                <img src="./images/video cloud.png" className="drop-shadow-[0px_0px_80px_] h-44 right-[14%] bottom-[20%] absolute" alt="hio" id="image1" />
                <img src="./images/cloud folder 3.png" className=" h-44 left-[23%] bottom-[10%]  absolute" alt="logo" id="image2" />
                <img src="./images/Folder black_prev_ui.png" className=" h-48 left-[16%] top-[16%] absolute" alt="" id="image3" />
                <img src="./images/cloud storage 2.png" className=" h-[200px] right-[22%] absolute top-[10%] " alt="" id="image4" />
                <h1 className="font-bold overflow-hidden z-10 drop-shadow-[0px_0px_5px_#000]">EVERYTHING</h1>
                <h1 className=" drop-shadow-[0px_0px_5px_#000] font-bold flex items-center gap-12 z-10">TO <SignInButton>
                    <div className=" hover:cursor-pointer text-[26px] hover:text-3xl transition-all  bg-sky-700 h-32 flex items-center justify-center w-[330px] px-12 rounded-[50px] hover:drop-shadow-[0px_0px_10px_#000] z-10">
                        UPLOAD NOW</div></SignInButton> STORE</h1>
                <h1 className="font-bold overflow-hidden z-10 drop-shadow-[0px_0px_5px_#000]">ANYTHING</h1>

            </div>
        </div>

    )
};

export default HomePage;
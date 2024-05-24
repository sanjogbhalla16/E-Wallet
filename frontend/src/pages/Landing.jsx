import React from "react";
import { GiWallet } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

export function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-zinc-800 h-screen w-full flex flex-col justify-center items-center">
      <div className="text-8xl font-bold flex items-center text-white my-12">
        E-Wallet <GiWallet />
      </div>
      <button
        onClick={() => navigate("/signup")}
        className="text-3xl text-black rounded-xl p-2 hover:bg-black duration-300 hover:text-white  bg-white"
      >
        Get Started
      </button>
    </div>
  );
}

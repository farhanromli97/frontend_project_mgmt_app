import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header
      className="h-20 w-screen flex justify-between items-center p-4 mb-1 border-b border-gray-800 "
    >
      <h6 className="cursor-pointer font-bold" onClick={() => navigate("/")}>
        Home
      </h6>
      <div>
        <button className="p-3 text-white	bg-black rounded" onClick={() => navigate("/register")}>Register</button>
        <button
          onClick={() => navigate("/login")}
          className="border border-black rounded ml-2 p-3"
        >
          Login
        </button>
      </div>
    </header>
  );
};

export default Header;

import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"

const Header2 = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    const cookies = new Cookies(null, {path: "/"})
    cookies.remove("token")
    navigate('/login')
  }
  return (
    <header
      className="h-20 w-screen flex justify-between items-center p-4 mb-1 border-b border-gray-800"
    >
      <h6 className="cursor-pointer font-bold" onClick={() => navigate("/")}>
        Home
      </h6>
      <div>
        <button className="p-3 text-white	bg-black rounded" onClick={() => navigate("/admin/projects")}>Projects</button>
        <button
          onClick={() => handleClick()}
          className="border border-black rounded ml-2 p-3"
        >
          Log out
        </button>
      </div>
    </header>
  );
};

export default Header2;

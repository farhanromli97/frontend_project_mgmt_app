import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "../pages/Home";
import Projects from "../pages/Projects";
import Items from "../pages/Items";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Cookies from "universal-cookie";
import { useEffect } from "react";


const AppRoutes = () => {
    return (
        <BrowserRouter basename="/">
            <Routes>
                <Route path='/' element ={<Home/>}/>
                <Route path='/register' element ={<Register/>}/>
                <Route path='/login' element ={<Login/>}/>
                <Route path='/admin/*' element ={<ProtectedRoutes/>}/>
            </Routes>
        </BrowserRouter>
    )
}


const ProtectedRoutes = () => {
    const cookies = new Cookies(null, {path: "/"})
    const token = cookies.get("token");
    const navigate = useNavigate();

    useEffect(()=>{
        if(!token){
            navigate("/login")
        }
    }, [])
    return (
        <Routes>
            <Route path='/projects' element ={<Projects/>}/>
            <Route path='/items' element ={<Items/>}/>
        </Routes>
    )
}

export default AppRoutes
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import Header from "../components/Header";

const Login = () => {
    const navigate = useNavigate()
    const cookies = new Cookies(null, {path: '/'})
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value
        const password = e.target[1].value

        const reqBody = {email, password}

        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/login`, {email, password})
            alert("Login successful")
            cookies.set('token', res.data.token)
            navigate('/admin/projects')
        } catch (error) {
            alert(error.response.data.message)
        }
        
    }
    return (
        <div className="flex flex-col h-screen">
            < Header />
            <div className="flex flex-row grow justify-center items-center">
                <form className="flex flex-col flex-1 max-w-md" onSubmit={(event) => handleSubmit(event)}>
                    <h1 className="flex flex-col font-bold text-xl">Login</h1>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input className="box-border border border-black rounded p-2" type="text" name="email" id="email" required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input className="box-border border border-black rounded p-2" type="text" name="password" id="password" required/>
                    </div>
                    <button className="bg-black text-white p-2 mt-2 rounded" type="submit">Login</button>
                </form>
            </div>

        </div>


    )
}

  

export default Login
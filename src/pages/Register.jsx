import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Register = () => {
    const navigate = useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault()
        const email = event.target[0].value
        const username = event.target[1].value
        const password = event.target[2].value
        const reqBody = {email, username, password}
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_API_URL}/register`, reqBody)
            alert('Registration successful')

            navigate('/login')
        } catch (error) {
            alert(error.response.data.message)
        }
    }


    return (
        <div className="flex flex-col h-screen">
            < Header />
            <div className="flex flex-row grow justify-center items-center">
                <form className="flex flex-col flex-1 max-w-md" onSubmit={event => handleSubmit(event)}>
                    <h1 className="flex flex-col font-bold text-xl">Register</h1>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input className="box-border border border-black rounded p-2" type="text" name="email" id="email" required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input className="box-border border border-black rounded p-2" type="text" name="username" id="username" required/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input className="box-border border border-black rounded p-2" type="text" name="password" id="password" required/>
                    </div>
                    <button className="bg-black text-white p-2 mt-2 rounded" type="submit">Register</button>
                </form>
            </div>
        </div>


    )
}

  

export default Register
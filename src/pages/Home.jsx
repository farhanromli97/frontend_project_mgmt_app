import Header from "../components/Header"
import Header2 from "../components/Header2"
import Cookies from "universal-cookie"

const Home = () => {
    const cookies = new Cookies(null, {path: "/"})
    const token = cookies.get("token")
    return (
        <div className="flex flex-col h-screen">
            {token? (< Header2/>):(< Header/>)}
            <div className="flex justify-center items-center grow">
                <h1 className="text-2xl">Welcome to your personal Project Management app</h1>
            </div>
        </div>
    )
}

export default Home
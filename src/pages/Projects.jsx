import { useEffect, useState } from "react"
import ProjectForm from "../components/ProjectForm"
import axios from "axios"
import Cookies from "universal-cookie"
import { Link, useNavigate } from 'react-router-dom';
import Header2 from "../components/Header2";

const Projects = () => {
    const navigate = useNavigate()
    const [projectData, setProjectData] = useState([])
    const [showModal, setShowModal] = useState(false)
    // const [projectID, setProjectId] = useState(0)
    const displayProjectData = async () => {
        try {
            const cookies = new Cookies(null, {path:"/"})
            const token = cookies.get("token")
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/projects`, config)
            setProjectData(res.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    // set state as true
    const onShow = () => {
        setShowModal(true)
    }

    // set state as false
    const onClose = () => {
        setShowModal(false)
    }

    const handleClick = (event) => {
        var projectID = ''
        if(event.target.localName === "div"){
            projectID = event.target.lastChild.value
        }else if(event.target.localName === "h2"){
            projectID = event.target.nextElementSibling.value
        }
        navigate(`/admin/items?projectid=${projectID}`)
    }
    // const sample_data = [
    //     {
    //         "id": 4,
    //         "project_name": "xxTo do list",
    //         "user_id": 2,
    //         "created_at": "2023-10-28T02:18:26.851Z",
    //         "description": "Practice React concept by creating a todo list app"
    //     },
    //     {
    //         "id": 5,
    //         "project_name": "Test",
    //         "user_id": 2,
    //         "created_at": "2023-10-28T02:18:26.851Z",
    //         "description": "Practice React concept by creating a todo list app"
    //     }
    // ]

    useEffect(()=> {displayProjectData()}, [])
    
    return (
        <div className="flex flex-col h-screen">
            < Header2/>
            <div className="flex flex-col grow justify-center items-center">
            <div className="flex justify-center w-1/2 p-6 mb-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={()=>onShow()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                stroke="currentColor" className="w-6 h-6  mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            Create New Project
            </div>

            {projectData.map((project) => (
                <div key={project.id} className="w-1/2 p-6 mb-2 bg-white border border-purple-300 rounded-lg shadow hover:bg-gray-100 text-center" onClick={handleClick}>
                    <h2>{project.project_name}</h2>
                    <input type="hidden" name="id" value={project.id} />
                </div>
            ))}
            <ProjectForm isVisible={showModal} closeForm = {onClose} setProjectData={setProjectData}/>
            </div>
        </div>

    )
}

export default Projects
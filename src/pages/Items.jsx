import axios from "axios"
import { useEffect, useState } from "react"
import Cookies from "universal-cookie"
import rightArrowLogo from "../assets/rightarrow.svg"
import leftArrowLogo from "../assets/leftarrow.svg"
import ItemForm from "../components/ItemForm"
import Header2 from "../components/Header2"


const Items = () => {
    const sampleData = [
        {
            "id": 2,
            "item": "Create Home page",
            "project_id": 1,
            "created_at": "2023-10-29T01:55:27.302Z",
            "status": "In Progress"
        },
        {
            "id": 3,
            "item": "Create Project page",
            "project_id": 1,
            "created_at": "2023-10-31T04:59:13.225Z",
            "status": "New"
        },
        {
            "id": 1,
            "item": "Gather requirement",
            "project_id": 1,
            "created_at": "2023-10-29T01:49:12.214Z",
            "status": "Done"
        }
    ]

    const [itemdata, setItemData] = useState([])
    const searchParams = new URLSearchParams(window.location.search)
    const projectID = searchParams.get('projectid')
    const fetchData = async () => {

        try {
            const cookies = new Cookies(null, {path:"/"})
            const token = cookies.get("token")
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }
            const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/items/${projectID}`, config)
            setItemData(res.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    const newStatusItems = itemdata.filter((data) => data.status === 'New')
    const inProgressStatusItems = itemdata.filter((data) => data.status === 'In Progress')
    const doneStatusItems = itemdata.filter((data) => data.status === 'Done')

    const handleClick = async (event) => {
        const itemId = event.target.attributes.value.value
        const arrowType = event.target.attributes.name.value;
        const cookies = new Cookies(null, {path:"/"})
        const token = cookies.get("token")
        const config = {
            headers: {Authorization: `Bearer ${token}`}
        }
        if(arrowType === "rightarrow"){
            try {
                await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/item/nextstatus/${itemId}`, {}, config)
                const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/items/${projectID}`, config)
                setItemData(res.data.data)
            } catch (error) {
                alert(error.response.data.message)
            }
        }else if(arrowType === "leftarrow"){
            try {
                await axios.patch(`${import.meta.env.VITE_BASE_API_URL}/item/prevstatus/${itemId}`,  {}, config)
                const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/items/${projectID}`, config)
                setItemData(res.data.data)
            } catch (error) {
                alert(error.response.data.message)
            }
        };
    
        
    }

    const [showModal, setShowModal] = useState(false)
    // set state as true
    const onShow = () => {
        setShowModal(true)
    }

    // set state as false
    const onClose = () => {
        setShowModal(false)
    }

    useEffect(()=>{fetchData()}, [])

    return(
        <div className="flex flex-col h-screen"> 
            < Header2/>
            <div className="flex flex-row grow m-2 justify-center">
                <div className="flex flex-col items-center m-2">
                    <div className="p-8 bg-white rounded-lg border border-black text-center m-2 w-96">New</div>
                        <div className="flex justify-center w-96 p-6 mb-2 bg-slate-800 text-white rounded hover:bg-slate-600" onClick={()=>onShow()}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6  mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        Create New Item
                        </div>

                    <ul className="flex flex-col w-96">
                    {newStatusItems.map((item) => (
                            <li key = {item.id} className="flex flex-row justify-between p-4 bg-white rounded-lg border border-black text-center mb-2">
                                <p>{item.item}</p>
                                <button type="button">
                                    <img src={rightArrowLogo} className="w-8 h-8" name ="rightarrow" value={item.id} onClick={handleClick}></img>
                                </button>
                            </li>
                    ))}
                    </ul>
                </div>
                <div className="m-2">
                    <div className="p-8 bg-white rounded-lg border border-black text-center m-2">In Progress</div>
                    <ul className="flex flex-col m-2 w-96">
                        {inProgressStatusItems.map((item) => (
                                <li key = {item.id} className="flex flex-row justify-between p-4 bg-white rounded-lg border border-black text-center m-2">
                                    <button type="button">
                                        <img src={leftArrowLogo} className="w-8 h-8 " name ="leftarrow" value={item.id} onClick={handleClick}></img>
                                    </button>
                                    <p>{item.item}</p>
                                    <button type="button">
                                        <img src={rightArrowLogo} className="w-8 h-8" name ="rightarrow" value={item.id} onClick={handleClick}></img>
                                    </button>
                                </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col m-2">
                    <div className="p-8 bg-white rounded-lg border border-black text-center m-2">Done</div>
                    <ul className="flex flex-col m-2 w-96">
                        {doneStatusItems.map((item) => (
                                <li key = {item.id} className="flex flex-row justify-between p-4 bg-white rounded-lg border border-black text-center m-2">
                                    <button type="button">
                                        <img src={leftArrowLogo} className="w-8 h-8 " name ="leftarrow" value={item.id} onClick={handleClick}></img>
                                    </button>
                                    <p>{item.item}</p>
                                </li>
                        ))}
                    </ul>
                </div>
            </div> 
            < ItemForm isVisible={showModal} closeForm = {onClose} setItemData={setItemData} project_id={projectID}/>
        </div>
    )
}

export default Items
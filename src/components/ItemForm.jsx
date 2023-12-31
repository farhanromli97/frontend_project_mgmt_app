import React from "react";
import Cookies from "universal-cookie";
import axios from "axios";

const ItemForm = ({isVisible, closeForm, setItemData, project_id}) => {
    const handleClose = (e) => {
        if(e.target.id === "wrapper"){
            closeForm()
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const item = e.target[0].value
        const reqBody = {item, project_id}
        try {
            const cookies = new Cookies(null, {path:"/"})
            const token = cookies.get("token")
            const config = {
                headers: {Authorization: `Bearer ${token}`}
            }

            await axios.post(`${import.meta.env.VITE_BASE_API_URL}/item/`, reqBody, config)
            const res = await axios.get(`${import.meta.env.VITE_BASE_API_URL}/items/${project_id}`, config)
            closeForm()
            setItemData(res.data.data)
        } catch (error) {
            alert(error.response.data.message)
        }
    }
    
    if (!isVisible) return null
    
    return (
    <div className=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-sm" id="wrapper" onClick={(event)=>handleClose(event)}>
        <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Create New Item
                    </h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => closeForm()}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close Form</span>
                    </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={handleSubmit}>
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label htmlFor="item" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="item" id="item" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Item name" required=""/>
                        </div>
                    </div>
                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                        Add new item
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}

export default ItemForm
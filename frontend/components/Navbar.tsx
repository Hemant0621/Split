import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Additem from './Additem'
import { darkModeState } from '@/hooks/darkmode'
import { useRecoilState } from 'recoil'

type Dark = {
    dark: boolean,
    setdark: Function
}


function Navbar() {

    const [username, setusername] = useState('')
    const [additem , setadditem ] = useState(false)

    const [dark, setDark] = useRecoilState(darkModeState);

    const toggleDarkMode = () => {
        if(!dark){
            window.document.body.style.backgroundColor = "#111820"
        }
        else{
            window.document.body.style.backgroundColor = "#f3aa4e"
        }
        setDark(!dark)
    };

    useEffect(() => {
        async function result() {
            const response = await axios.get("https://split-backend-five.vercel.app/api/user", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setusername(response.data.user.username)
        }

        result()
    }, [])

    return (
        <div className=' bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear dark:text-white md:p-2'>
            {additem?<Additem setadditem={setadditem} />:''}
            <div className='w-full flex justify-between p-2 md:p-5'>
                <div className=' flex gap-4 md:gap-10 lg:gap-16 items-center '>
                    <h1 className='text-md md:text-xl lg:text-3xl font-extrabold '>Dashboard</h1>
                    <button onClick={()=>setadditem(true)} className="rounded-lg relative w-20 md:w-36 h-7  md:h-10 cursor-pointer flex items-center border border-[#c8d3d5] dark:border-[#604083] bg-[#c8d3d5] dark:bg-[#604083] group hover:bg-[#c8d3d5] dark:hover:bg-[#604083] active:bg-[#c8d3d5] dark:active:bg-[#604083] active:border-[#c8d3d5] dark:active:border-[#604083]">
                        <span className="text-black dark:text-white font-semibold text-center md:text-left w-full md:ml-3 text-xs md:text-sm lg:text-lg transform group-hover:hidden transition-all duration-300">Add Item</span>
                        <span className=" hidden md:flex absolute right-0 h-full w-10 rounded-lg bg-[#c8d3d5] dark:bg-[#604083] items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-500">
                            <svg className="svg w-8 text-black dark:text-white"
                                fill="none"
                                height="24"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                width="24"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="12" x2="12" y1="5" y2="19"></line>
                                <line x1="5" x2="19" y1="12" y2="12"></line>
                            </svg>
                        </span>
                    </button>
                </div>
                <div className='flex gap-3 md:gap-5 lg:gap-6 items-center'>
                    <img className='rounded-full hidden md:block w-14 transition-transform transform hover:scale-110 cursor-pointer' src='/student.gif' alt='' />
                    <div className=' font-bold text-mono text-sm md:text-xl lg:text-2xl'>{username}</div>
                    <img className=' w-8 md:w-10 cursor-pointer' src={!dark ? "/night-mode.png" : "/brightness.png"} alt=''
                        onClick={toggleDarkMode}
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar
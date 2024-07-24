import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Additem from './Additem'
import { darkModeState } from '@/hooks/darkmode'
import { useRecoilState } from 'recoil'
import { DATABASE_URL } from '@/config'


type Dark = {
    dark: boolean,
    setdark: Function
}


function Navbar({RefreshAvatar} : {RefreshAvatar? : boolean}) {

    const [username, setusername] = useState('')
    const [avatar, setAvatar] = useState(0)
    const [additem, setadditem] = useState(false)
    const [Refresh , setRefresh ] = useState(true)
    const [dark, setDark] = useRecoilState(darkModeState);

    const toggleDarkMode = () => {
        if (!dark) {
            window.document.body.style.backgroundColor = "#111820"
        }
        else {
            window.document.body.style.backgroundColor = "#f3aa4e"
        }
        setDark(!dark)
    };

    useEffect(() => {
        async function result() {
            const response = await axios.get(`${DATABASE_URL}/user`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setusername(response.data.user.username)
            setAvatar(response.data.user.avatar)
        }

        result()
    }, [RefreshAvatar])

    return (
        <div className=' bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear dark:text-white md:p-2'>
            {additem ? <Additem setadditem={setadditem} url={`${DATABASE_URL}/account`} Refresh={Refresh} setRefresh={setRefresh}/> : ''}
            <div className='w-full flex justify-between p-2 md:p-5'>
                <div className=' flex gap-4 md:gap-10 lg:gap-16 items-center '>
                    <button className='text-md md:text-xl flex items-center gap-1 lg:text-3xl font-extrabold group relative md:pointer-events-none'>
                        Dashboard
                        <span className='md:hidden'><img className='h-2 dark:invert' src='/down.png' /></span>
                        <div className='hidden group-focus-within:flex w-[7rem] pb-4 h-10rem flex-col gap-3 absolute top-0 z-10 bg-[#f3aa4e] dark:bg-[#111820] shadow-black shadow-md rounded-lg'>
                            <div className='flex flex-col px-2 gap-3 pt-5 '>
                                <a href="/"><h1 className=' font-medium  text-lg  w-full bg-white dark:bg-[#604083] rounded-lg '>Home</h1></a>
                                <a href="/Trip"><h1 className=' font-medium  text-lg  w-full bg-white dark:bg-[#604083] rounded-lg '>Trips</h1></a>
                                <a href=""><h1 className=' font-medium  text-lg  w-full bg-white dark:bg-[#604083] rounded-lg '>profile</h1></a>
                            </div>
                            <div className='flex gap-1 justify-center items-center px-1 py-1 mx-2  bg-white dark:bg-[#604083] rounded-lg '
                                onClick={() => {
                                    location.href = '/signin'
                                    localStorage.removeItem('token')
                                }}
                            >
                                <img className='h-4 dark:invert' src="/logout.png " alt="" />
                                <h1 className='font-medium  text-base '>Logout</h1>
                            </div>
                        </div>
                    </button>
                    <button onClick={() => setadditem(true)} className="rounded-lg relative w-20 md:w-36 h-7  md:h-10 cursor-pointer flex items-center border border-black dark:border-[#604083] bg-[#c8d3d5] dark:bg-[#604083] group hover:bg-[#c8d3d5] dark:hover:bg-[#604083] active:bg-[#c8d3d5] dark:active:bg-[#604083] active:border-[#c8d3d5] dark:active:border-[#604083] ">
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
                    <img className='rounded-full hidden md:block w-14 transition-transform transform hover:scale-110 cursor-pointer border border-black ' src={`/avatar/avatar${avatar}.gif`} alt='' />
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
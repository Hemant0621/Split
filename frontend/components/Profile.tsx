import { DATABASE_URL } from '@/config'
import axios from 'axios'
import { Span } from 'next/dist/trace'
import React, { useEffect, useState } from 'react'

function Profile({ setRefreshAvatar }: { setRefreshAvatar: Function }) {

    type User = {
        Email: string,
        firstName: string,
        lastName: string,
        username: string,
        contact: string,
        UPI: string,
        avatar: Number,
        password: string
    }

    const avatar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    const [Active, setActive] = useState(0)
    const [Cpassword,setCpassword] = useState('')
    const [edit, setEdit] = useState(false)
    const [Refresh, setRefresh] = useState(false)
    const [user, setuser] = useState<User>({
        Email: "loading...",
        firstName: 'loading...',
        lastName: '',
        username: 'loading...',
        contact: 'loading...',
        UPI: 'loading...',
        avatar: 0,
        password: ''
    })


    useEffect(() => {
        async function result() {
            const response = await axios.get(`${DATABASE_URL}/user`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data)
            setEdit(false)
            setActive(response.data.user.avatar)
            setuser(response.data.user)
        }

        result()
    }, [Refresh])

    return (
        <div className=' h-screen lg:h-full flex justify-center items-center bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear '>
            <div className='relative w-5/6 lg:h-4/5 bg-white dark:bg-[#353148] rounded-xl border border-black shadow-lg shadow-[#111820] dark:shadow-slate-700 py-10 px-5 lg:p-10'>
                <div className='absolute -left-10 -top-10 cursor-pointer hidden lg:block'>
                    <div className='relative h-full group w-full bg-white rounded-full border-black border-2 '>
                        <img className='h-28 rounded-full group-hover:opacity-45 ' src={`/avatar/avatar${Active}.gif`} />
                        <button className='absolute top-0 z-10 w-full h-full group/avatar flex justify-center items-center rounded-full border'>
                            <img className='opacity-0 group-hover:opacity-100  h-10 ' src='/edit.png' />
                            <div className='p-3 absolute border-black border-2 rounded-xl top-10 -right-72 w-80 bg-[#f3aa4e] dark:bg-[#111820] hidden group-focus-within/avatar:block '>
                                <div className=' w-full  grid grid-cols-4 grid-flow-row gap-2'>
                                    {avatar.map((index) => (
                                        <img key={index} className='h-16 transition-transform transform hover:scale-110 rounded-full' src={`/avatar/avatar${index}.gif`} alt=""
                                            onClick={async () => {
                                                setActive(index)
                                                const response = await axios.put(`${DATABASE_URL}/user`, {
                                                    avatar: index
                                                }, {
                                                    headers: {
                                                        authorization: `Bearer ${localStorage.getItem('token')}`
                                                    }
                                                })
                                                setRefreshAvatar((a: boolean) => !a)
                                            }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>


                <div className={`px-2 py-0 md:px-12 text-center lg:text-left flex flex-col h-full ${edit ? "justify-around" : "justify-start"} `}>
                    <div>
                        <div className="block lg:hidden rounded-full shadow-xl mx-auto h-48 w-48 bg-cover bg-center ">
                            <div className='relative h-full group w-full rounded-full border-black border-4'>
                                <img className='h-full rounded-full group-hover:opacity-45 ' src={`/avatar/avatar${Active}.gif`} />
                                <button className='absolute top-0 z-10 w-full h-full group/avatar flex justify-center items-center rounded-full border'>
                                    <img className='opacity-0 group-hover:opacity-100  h-10 ' src='/edit.png' />
                                    <div className='p-3 absolute border-black border-2 rounded-xl top-10 bottom-0 w-80 overflow-y-auto bg-[#f3aa4e] dark:bg-[#111820] hidden group-focus-within/avatar:block '>
                                        <div className=' w-full  grid grid-cols-4 grid-flow-row gap-2'>
                                            {avatar.map((index) => (
                                                <img key={index} className='h-16 transition-transform transform hover:scale-110 rounded-full' src={`/avatar/avatar${index}.gif`} alt=""
                                                    onClick={async () => {
                                                        setActive(index)
                                                        const response = await axios.put(`${DATABASE_URL}/user`, {
                                                            avatar: index
                                                        }, {
                                                            headers: {
                                                                authorization: `Bearer ${localStorage.getItem('token')}`
                                                            }
                                                        })
                                                        setRefreshAvatar((a: boolean) => !a)
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold pt-8 lg:pt-0" >{
                            edit
                                ?
                                <input className='dark:bg-[#353148]' value={user.firstName + " " + user.lastName} placeholder={user.firstName + " " + user.lastName} onChange={(e) => {
                                    setuser({ ...user, username: e.target.value })
                                }} />
                                :
                                <span>{user.firstName + " " + user.lastName}</span>
                        }</h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
                        <p className="pt-4 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-black dark:text-white pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Username</title>
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6.28 2.69-6.93 6.1-.12.62.48 1.1 1.05 1.1H18.9c.57 0 1.17-.48 1.05-1.1C18.28 16.69 15.31 14 12 14z" />
                            </svg>
                            Username: {
                                edit
                                    ?
                                    <input className='lg:mx-2 dark:bg-[#353148]' value={user.username} placeholder={user.username} onChange={(e) => {
                                        setuser({ ...user, username: e.target.value })
                                    }} />
                                    :
                                    <span className='font-medium mx-2'> {user.username}</span>
                            }
                        </p>
                        <p className="pt-2 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start">
                            <svg className="h-4 fill-current text-black dark:text-white pr-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <title>Contact</title>
                                <path
                                    d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                            </svg> Contact : {
                                edit
                                    ?
                                    <input className='lg:mx-2 dark:bg-[#353148]' value={user.contact} placeholder={user.contact} onChange={(e) => {
                                        setuser({ ...user, contact: e.target.value })
                                    }} />
                                    :
                                    <span className='font-medium mx-2'>{user.contact}</span>
                            }
                        </p>
                        <p className="pt-2 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start dark:text-white">
                            <svg className="h-4 fill-current text-black dark:text-white pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Email</title>
                                <path d="M21 4H3c-1.1 0-1.99.9-1.99 2L1 20c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-1.5 2l-8.5 6.2L3.5 6 3 6.5 12 12l8.5-6.5L19.5 6zM21 18H3V8l9 6.8L21 8v10z" />
                            </svg>

                            Email: {
                                edit
                                    ?
                                    <input className='lg:mx-2 dark:bg-[#353148]' value={user.Email} placeholder={user.Email} onChange={(e) => {
                                        setuser({ ...user, Email: e.target.value })
                                    }} />
                                    :
                                    <span className='font-medium mx-2'>{user.Email}</span>
                            }
                        </p>
                        <p className="pt-2 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start dark:text-white">
                            <svg className="h-4 fill-current text-black dark:text-white pr-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <title>UPI-ID</title>
                                <path
                                    d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z" />
                            </svg> UPI ID: {
                                edit
                                    ?
                                    <input className='lg:mx-2 dark:bg-[#353148]' value={user.UPI} placeholder={user.UPI} onChange={(e) => {
                                        setuser({ ...user, UPI: e.target.value })
                                    }} />
                                    :
                                    <span className='font-medium mx-2'> {user.UPI}</span>
                            }
                        </p>

                    </div>
                    {edit
                        ? <div>
                            <h1 className='font-bold'>Change Password</h1>
                            <p className="pt-2 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start dark:text-white">
                                <svg className="h-4 fill-current text-black dark:text-white pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title>Password</title>
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2 0-.74.41-1.38 1.01-1.72V12c0-.55.45-1 1-1s1 .45 1 1v1.28c.6.34 1.01.98 1.01 1.72 0 1.1-.9 2-2 2zm3-9H9V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2z" />
                                </svg>
                                Password: <input className='lg:mx-2 dark:bg-[#353148]' placeholder='New Password' onChange={(e) => {
                                    setuser({ ...user, password: e.target.value })
                                }} />
                            </p>
                            <p className="pt-2 text-sm lg:text-base font-bold flex items-center justify-start md:justify-center lg:justify-start dark:text-white">
                                <svg className="h-4 fill-current text-black dark:text-white pr-4" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <title>Confirm Password</title>
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm3 9c-1.1 0-2-.9-2-2 0-.74.41-1.38 1.01-1.72V12c0-.55.45-1 1-1s1 .45 1 1v1.28c.6.34 1.01.98 1.01 1.72 0 1.1-.9 2-2 2zm5.3-2.71l-1.42 1.42-2.59-2.59 1.42-1.42 1.17 1.17 2.12-2.12 1.42 1.42-3.12 3.12z" />
                                </svg>

                                Confirm Password: <input className='lg:mx-2 dark:bg-[#353148]' placeholder='Confirm Password' onChange={(e) => {
                                    setCpassword(e.target.value)
                                }} />
                            </p>

                        </div>
                        : ""
                    }

                    {edit
                        ?
                        <div className='w-full flex justify-around'>
                            <button
                                className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                onClick={async () => {
                                    setEdit(false)
                                    if (user.password != Cpassword) {
                                        alert("password Does not match")
                                    }
                                    else {
                                        const response = await axios.put(`${DATABASE_URL}/user`, user, {
                                            headers: {
                                                authorization: `Bearer ${localStorage.getItem('token')}`
                                            }
                                        })
                                        console.log(response.data)
                                        setRefresh(!Refresh)
                                    }
                                }}
                            >
                                Submit
                            </button>

                            <button
                                className="bg-[#292929] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                onClick={() => {
                                    setRefresh(!Refresh)
                                }}
                            >
                                Cancel
                            </button>

                            <button
                                className="bg-[#fd5050] border-2 border-[#3e3e3e] rounded-lg text-white px-6 py-3 text-base hover:border-[#fff] cursor-pointer transition"
                                onClick={() => {
                                    setRefresh(!Refresh)
                                }}
                            >
                                Delete Account
                            </button>

                        </div>
                        :
                        ""}
                </div>

                <div className='absolute top-5 right-5 '><img className='h-10 cursor-pointer rounded-full  ' src="/edit.gif" alt=""
                    onClick={() => {
                        setEdit(true)
                    }}
                /></div>
            </div>
        </div>
    )
}

export default Profile
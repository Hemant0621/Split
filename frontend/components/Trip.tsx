import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Trip() {

    const [code, setcode] = useState('')
    const [trips, settrips] = useState([])

    useEffect(() => {

        async function result() {

            const response = await axios.get("http://localhost:3002/api/party", {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            console.log(response.data.results)
            settrips(response.data.results)
        }

        result()
    },[])



    return (
        <div className='border-2 ml-5 h-5/6 rounded-lg px-5 flex flex-col justify-around'>
            <div className=' h-[30%] flex justify-around'>
                <div className='border-2 h-full w-[68%]'>

                </div>
                <div className=' h-full w-[30%] flex flex-col justify-around'>
                    <button className='w-full h-[45%] rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash'
                        onClick={async () => {
                            const response = await axios.post("https://split-backend-five.vercel.app/api/party/create", {
                                location: "delhi"
                            }, {
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            if (response.data.party.Id) {
                                location.href = `/Trip/${response.data.party.Id}`

                            }
                        }}
                    >Create a Trip party</button>
                    <button className='w-full h-[45%] rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash'>
                        <div className='w-full group-focus-within:hidden '>Join a Trip party</div>
                        <div className='w-full justify-around items-center hidden group-focus-within:flex'>
                            <input className='w-2/4 px-4 py-2 font-Clash rounded-lg text-base ' placeholder='Enter the party code ' onChange={(e) => {
                                setcode(e.target.value)
                            }} />
                            <div className='w-1/4 focus:hidden bg-[#f3aa4e] dark:bg-[#090c10] rounded-lg p-2 font-medium font-Clash'
                                onClick={async () => {
                                    if (code.length == 6) {
                                        const response = await axios.post("https://split-backend-five.vercel.app/api/party/join", {
                                            Id: code
                                        }, {
                                            headers: {
                                                authorization: `Bearer ${localStorage.getItem('token')}`
                                            }
                                        })
                                        if (response.data.message) {
                                            alert(response.data.message)
                                        }
                                        else {
                                            location.href = `/Trip/${response.data.party.Id}`
                                        }
                                    }
                                    else {
                                        alert('enter a valid party code')
                                    }
                                }}
                            >Join</div>
                        </div>
                    </button>
                </div>
            </div>
            <div className=' h-[65%] flex justify-between '>

                <div className=' w-full md:w-7/12 bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl h-full'>
                    <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Last 10 Trips</h1>
                    <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
                        <div className=' px-2 md:px-5 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
                            <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-left '>Location</h1>
                            <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-center '>Code</h1>
                            <h1 className=' w-1/4 font-medium font-Clash text-sm md:text-base text-center '>total expense</h1>
                            <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-right '>Date</h1>
                        </div>

                        <div className=' px-2 md:px-4 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>

                            {trips.length > 0 ? trips.map((trip: {
                                Id: string,
                                type: string,
                                partyGroups: {
                                    location: string,
                                    total : Number
                                },
                                date: string,
                                _id: string
                            }) => (
                                <div key={trip._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300'>
                                    <h1 className='w-1/4 text-left text-xs md:text-sm break-words px-1'>{trip.partyGroups.location}</h1>
                                    <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{trip.Id}</h1>
                                    <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{trip.partyGroups.total.toString()}</h1>
                                    <h1 className='w-1/4 text-right text-xs md:text-sm break-words px-1'>{trip.date}</h1>
                                </div>
                                )) : <div className='text-center font-medium text-base md:text-xl'>No Trips yet</div>}

                        </div>
                    </div>
                </div>

                <div className='w-full md:w-4/12 bg-white rounded-xl'>

                </div>

            </div>
        </div>
    )
}

export default Trip
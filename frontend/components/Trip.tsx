import { DATABASE_URL } from '@/config'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Trip() {

    const [code, setcode] = useState('')
    const [Avg, setAvg] = useState('loading...')
    const [trips, settrips] = useState([])
    const [destination, setdestination] = useState('')


    useEffect(() => {

        async function result() {

            const response = await axios.get(`${DATABASE_URL}/party`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if (response.data.results) {
                console.log(response.data.results)
                settrips(response.data.results)
                let total = 0
                let count = 0
                response.data.results.map((trip: { total: { $numberDecimal: string } , balance : { $numberDecimal: string }  }) => {
                    total = total + parseInt(trip.total.$numberDecimal) - parseInt(trip.balance.$numberDecimal)
                    count++;
                })
                setAvg((total / count).toFixed(2).toString())
            }
        }

        result()
    }, [])



    return (
        <div className=' md:h-5/6 px-5 flex flex-col justify-around bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear'>
            <div className=' md:h-[30%] flex md:flex-row flex-col-reverse justify-around'>
                <div className='border-2 h-full md:w-[68%]'>
                    {Avg}
                </div>
                <div className=' h-full w-full md:w-[30%] flex gap-2 flex-col justify-around'>
                    <button className='w-full py-3 md:h-[45%] group rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash border border-black'>
                        <div className='w-full group-focus-within:hidden '>Create a Trip party</div>
                        <div className='w-full justify-around items-center hidden group-focus-within:flex'>
                            <input className='w-2/4 px-4 py-2 font-Clash rounded-lg text-base ' placeholder='Enter the Location ' onChange={(e) => {
                                setdestination(e.target.value)
                            }} />
                            <div className='w-1/4 focus:hidden bg-[#f3aa4e] dark:bg-[#090c10] rounded-lg p-2 font-medium font-Clash'
                                onClick={async () => {
                                    const response = await axios.post(`${DATABASE_URL}/party/create`, {
                                        location: destination
                                    }, {
                                        headers: {
                                            authorization: `Bearer ${localStorage.getItem('token')}`
                                        }
                                    })
                                    if (response.data.party.Id) {
                                        location.href = `/Trip/${response.data.party.Id}`

                                    }
                                }}
                            >Create</div>
                        </div>
                    </button>
                    <button className='w-full py-3 md:h-[45%] rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash border border-black'>
                        <div className='w-full group-focus-within:hidden '>Join a Trip party</div>
                        <div className='w-full justify-around items-center hidden group-focus-within:flex'>
                            <input className='w-2/4 px-4 py-2 font-Clash rounded-lg text-base ' placeholder='Enter the party code ' onChange={(e) => {
                                setcode(e.target.value)
                            }} />
                            <div className='w-1/4 focus:hidden bg-[#f3aa4e] dark:bg-[#090c10] rounded-lg p-2 font-medium font-Clash'
                                onClick={async () => {
                                    if (code.length == 6) {
                                        const response = await axios.post(`${DATABASE_URL}/party/join`, {
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
            <div className=' md:h-[65%] flex flex-col md:flex-row justify-between '>

                <div className=' w-full md:w-[65%] bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl h-full border border-black'>
                    <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Last 10 Trips</h1>
                    <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
                        <div className=' px-2 md:px-5 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
                            <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-left '>Location</h1>
                            <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>Code</h1>
                            <h1 className=' w-1/4 font-semibold font-Clash text-sm md:text-base text-center '>total expense</h1>
                            <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>Date</h1>
                        </div>

                        <div className=' px-2 md:px-5 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>

                            {trips.length > 0 ? trips.map((trip: {
                                Id: string,
                                partyGroups: [{
                                    location: string,
                                    total: {
                                        $numberDecimal: Number
                                    },
                                    date: ''
                                }],
                                date: string,
                                _id: string

                            }) => (
                                <div key={trip._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300  cursor-pointer border border-black'
                                    onClick={() => location.href = `/Trip/${trip.Id}`}
                                >
                                    <h1 className='w-1/4 text-left font-medium text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].location}</h1>
                                    <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{trip.Id}</h1>
                                    <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].total.$numberDecimal.toString()}</h1>
                                    <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{new Date(trip.partyGroups[0].date).toLocaleDateString()}</h1>
                                </div>
                            )) : <div className='text-center font-medium text-base md:text-xl'>No Trips yet</div>}

                        </div>
                    </div>
                </div>

                <div ref={chartRef}  className='w-full md:w-[34%] bg-white rounded-xl border border-black'></div>

            </div>
        </div>
    )
}

export default Trip
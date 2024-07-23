import { DATABASE_URL } from '@/config'
import useCategoryECharts from '@/hooks/useCategoryChart';
import useTrips from '@/hooks/useTrips';
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

function Trip() {
    const chartRef = useRef(null);
    const [code, setcode] = useState('')
    const [type, settype] = useState('avg')
    const [destination, setdestination] = useState('')
    const [Refresh,setRefresh] = useState(true)
    const { Avg, Total, Count, Expensive, trips, data } = useTrips(type,Refresh);
    useCategoryECharts(chartRef, data)

    return (
        <div className=' md:h-5/6 px-5 flex flex-col gap-3 justify-around bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear'>
            <div className=' md:h-[30%] flex gap-3 md:flex-row flex-col-reverse justify-around'>
                <div className='h-full md:w-[68%]'>
                    <div className=' md:h-full w-full flex flex-col gap-2 justify-between items-center '>
                        <div className='h-[49%] w-full flex justify-between'>
                            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
                                <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#f54f5f] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                                    <img className='w-full h-full p-1' src="/average.png" alt="" />
                                </div>
                                <div className=' w-2/3  h-full flex flex-col justify-center'>
                                    <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Average trip Expense</h1>
                                    <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>₹{Avg}</h1>
                                </div>
                            </div>
                            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
                                <div className='w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#27d095] rounded-lg ml-1 md:rounded-2xl p-2 m-2'>
                                    <img className='w-full h-full' src="/spending.png" alt="" />
                                </div>
                                <div className=' w-2/3  h-full flex flex-col justify-center'>
                                    <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Total expense</h1>
                                    <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>₹{Total}</h1>
                                </div>
                            </div>
                        </div>

                        <div className='h-[49%] w-full flex  justify-between'>
                            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
                                <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#67cadf] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                                    <img className='w-full h-full' src="/location.png" alt="" />
                                </div>
                                <div className=' w-2/3  h-full flex flex-col justify-center'>
                                    <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Total trips</h1>
                                    <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>{Count}</h1>
                                </div>
                            </div>
                            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
                                <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#ff9f60] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                                    <img className='w-full h-full' src="/date.png" alt="" />
                                </div>
                                <div className=' w-2/3  h-full flex flex-col justify-center'>
                                    <h1 className=' font-bold text-[3vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Expensive Category</h1>
                                    <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>{Expensive}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' h-full w-full md:w-[30%] flex gap-3 flex-col justify-between '>
                    <button className='w-full md:h-[49%] py-5 group rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash border border-black'>
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
                    <button className='w-full  md:h-[49%] py-5 rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash border border-black'>
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
                            <h1 className=' w-1/5 font-semibold font-Clash text-base md:text-lg text-left '>Location</h1>
                            <h1 className=' w-1/5 font-semibold font-Clash text-base md:text-lg text-center '>Code</h1>
                            <h1 className=' w-1/5 font-semibold font-Clash text-sm md:text-base text-center '>total expense</h1>
                            <h1 className=' w-1/5 font-semibold font-Clash text-base md:text-lg text-center '>Date</h1>
                            <h1 className=' w-1/5 font-semibold font-Clash text-base md:text-lg text-center '>Delete</h1>
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
                                <div key={trip._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300  cursor-pointer border border-black'>
                                    <div className='w-4/5 flex justify-between ' onClick={() => location.href = `/Trip/${trip.Id}`}>
                                        <h1 className='w-1/4 text-left font-medium text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].location}</h1>
                                        <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{trip.Id}</h1>
                                        <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].total.$numberDecimal.toString()}</h1>
                                        <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{new Date(trip.partyGroups[0].date).toLocaleDateString()}</h1>
                                    </div>
                                    <button className='w-1/5 text-center font-medium text-xs md:text-sm break-words px-1 bg-black text-white rounded-lg transition-transform transform hover:scale-110 py-1'
                                    onClick={async()=>{
                                        const check = confirm(`DO you want to delete your ${trip.partyGroups[0].location} Trip `)
                                        if(check){
                                            const response = await axios.delete(`${DATABASE_URL}/party/party_group`,{
                                                params : {
                                                    Id:trip.Id
                                                }
                                            })
                                            if(response.data=="deleted"){
                                                setRefresh(!Refresh)
                                            }
                                        }
                                    }}
                                    >Delete</button>
                                </div>
                            )) : <div className='text-center font-medium text-base md:text-xl'>No Trips yet</div>}

                        </div>
                    </div>
                </div>

                <div className='relative w-full md:w-[34%] h-[30rem] md:h-full bg-white rounded-xl p-2 mt-5 md:mt-0 border border-black flex justify-center items-center'>
                    {data[0].value==0
                        ?
                        <div className='flex justify-center items-center h-full w-full'>
                            <div className="inline-flex items-center px-4 py-2 bg-[#f3aa4e] dark:bg-[#111820] hover:bg-[#ff9b20] dark:hover:bg-[#090c10] dark:text-white transition ease-in-out delay-75 text-black text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110 cursor-pointer">
                                No transaction
                            </div>
                        </div>
                        :
                        <>
                            <div ref={chartRef} className='w-full h-full rounded-xl'></div>
                            <button className='absolute top-3 right-2 md:right-6 group text-end text-sm md:text-base lg:text-lg font-medium text-red-700 md:text-slate-400 p-1 cursor-pointer z-20 '>
                                {type}
                                <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] dark:text-white w-40 flex-col gap-3 p-3 items-center right-0 text-center rounded-lg hidden group-focus-within:flex z-30'>
                                    <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-2 md:px-4 py-2 md:py-2 w-full' onClick={() => settype('total')} >Total</h1>
                                    <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg px-2 md:px-4 py-2 md:py-2 w-full' onClick={() => settype('avg')} >Avg</h1>
                                </div>
                            </button>
                        </>}
                </div>

            </div>
        </div>
    )
}

export default Trip
import { loadingState } from '@/hooks/darkmode'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

function Spending() {

    const [total, settotal] = useState(0)
    const [month, setmonth] = useState(0)
    const today = new Date()
    const [startdate, setSartDate] = useState(new Date(new Date().getDate()))
    const [enddate, setEndDate] = useState(today)
    const [loading, setloading] = useRecoilState(loadingState)

    useEffect(() => {

        const startOfCurrentMonth: any = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfLastMonth = new Date(startOfCurrentMonth - 1);
        const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);
        async function result() {
            const total = await axios.post("https://split-backend-five.vercel.app/api/account/amount", {
                start: startdate,
                end: enddate
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const month = await axios.post("https://split-backend-five.vercel.app/api/account/amount", {
                start: startOfLastMonth,
                end: endOfLastMonth
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            settotal(total.data.total)
            setmonth(month.data.total)
            setloading(false)
        }

        result()

    }, [startdate, enddate])

    if (loading) {
        return null
    }

    return (
        <div className='grid grid-cols-12 gap-2 md:gap-3 w-full h-[10vw] md:h-1/4 p-1 '>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full relative rounded-xl md:rounded-2xl flex items-center py-3 md:py-6 md:px-5'>
                <div className='w-1/3 md:w-[5vw] lg:w-[4vw]  bg-[#27d095] rounded-lg ml-1 md:rounded-2xl p-2'>
                    <img className='w-full h-full' src="/spending.png" alt="" />
                </div>
                <div className='w-2/3 h-full flex flex-col justify-center px-2  md:px-5'>
                    <h1 className=' font-bold text-[2vw] md:text-[1.2vw] text-slate-800 dark:text-white'>Total Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-[3vw] md:text-[1.5vw] text-slate-400'>₹{total}</h1>
                </div>
                <button className='absolute top-0 md:top-1 right-1 md:right-3 text-[2vw] md:text-[1.2vw] group/main text-end font-medium text-slate-400 p-1 cursor-pointer'>
                    Lifetime
                    <div className='text-slate-800 z-20 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] dark:text-white w-32 md:w-40 flex-col gap-3 p-3 items-center left-10 md:-left-10 text-center rounded-lg hidden group-focus-within/main:flex'>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg w-full text-sm md:text-lg md:px-4 py-2 md:w-36' onClick={() => { setSartDate(new Date(new Date().getDate())); setEndDate(today) }} >Lifetime</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg w-full text-sm md:text-lg md:px-4 py-2 md:w-36' onClick={() => { setSartDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)) }} >Last 7 days</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg w-full text-sm md:text-lg md:px-4 py-2 md:w-36' onClick={() => { setSartDate(new Date(today.getFullYear(), today.getMonth(), 1)) }} >This month</h1>
                        <h1 className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg w-full text-sm md:text-lg md:px-4 py-2 md:w-36' onClick={() => { setSartDate(new Date(today.getFullYear(), 1, 1)) }} >Ths year</h1>
                        <button className='bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] hover:bg-[#d1d1d1] rounded-lg w-full text-sm md:text-lg md:px-4 py-2 md:w-36 group/sub'>
                            Custom
                            <div className='text-slate-800 shadow-md shadow-black absolute bg-[#f3aa4e] dark:bg-[#353148] gap-3 p-3 items-center text-center rounded-lg hidden group-focus-within/sub:flex'>
                                <div className=''>
                                    <label htmlFor="startDate" className="block text-black dark:text-white text-[1.5vw] text-left w-full font-medium">Start Date</label>
                                    <input onChange={(e) => { setSartDate(new Date(e.target.value)) }} type='date' className='w-full p-2 border border-black rounded-lg' placeholder='Start Date' />
                                </div>
                                <div className=''>
                                    <label htmlFor="endDate" className="block text-black dark:text-white text-[1.5vw] text-left w-full font-medium">End Date</label>
                                    <input onChange={(e) => { setEndDate(new Date(e.target.value)) }} type='date' className='w-full p-2 border border-black rounded-lg' placeholder='End Date' />
                                </div>
                                <button className='rounded-xl py-2 px-5 bg-white dark:bg-[#090c10] dark:hover:bg-[#1f2a38] dark:text-white'>Apply</button>
                            </div>
                        </button>
                    </div>
                </button>
            </div>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full rounded-xl md:rounded-2xl flex gap-3 items-center md:py-6 md:px-5'>
                <div className=' w-1/3 md:w-[5vw] lg:w-[4vw]  bg-[#67cadf] ml-1 rounded-lg md:rounded-2xl p-2'>
                    <img className='w-full h-full' src="/month.png" alt="" />
                </div>
                <div className=' w-2/3  h-full flex flex-col justify-center'>
                    <h1 className=' font-bold text-[2vw] md:text-[1.2vw] text-slate-800 dark:text-white'>Last month Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-[3vw] md:text-[1.5vw] text-slate-400'>₹{month}</h1>
                </div>
            </div>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full rounded-xl md:rounded-2xl flex gap-3 items-center md:py-6 md:px-5'>
                <div className=' w-1/3 md:w-[5vw] lg:w-[4vw]  bg-[#f54f5f] ml-1 rounded-lg md:rounded-2xl p-2'>
                    <img className='w-full h-full' src="/travel-bag.png" alt="" />
                </div>
                <div className=' w-2/3 h-full flex flex-col justify-center' >
                    <h1 className=' font-bold text-[2vw] md:text-[1.2vw] text-slate-800 dark:text-white'>Last trip Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-[3vw] md:text-[1.5vw] text-slate-400'>₹6000</h1>
                </div>
            </div>
        </div>
    )
}

export default Spending
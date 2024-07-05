import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Spending() {

    const [total, settotal] = useState(0)
    const [month, setmonth] = useState(-1)

    useEffect(() => {

        const today = new Date()
        const startOfCurrentMonth:any = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfLastMonth = new Date(startOfCurrentMonth - 1);
        const startOfLastMonth = new Date(endOfLastMonth.getFullYear(), endOfLastMonth.getMonth(), 1);
        async function result() {
            const total = await axios.post("https://split-backend-five.vercel.app/api/account/amount")
            const month = await axios.post("https://split-backend-five.vercel.app/api/account/amount", {
                start : startOfCurrentMonth,
                end : endOfLastMonth
            }, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            settotal(total.data.total)
            setmonth(month.data.total)
        }

        result()

    }, [])

    return (
        <div className='grid grid-cols-12 h-1/5 gap-10 w-full '>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full relative rounded-3xl flex items-center px-5'>
                <div className='w-1/4  bg-[#27d095] rounded-lg p-5'>
                    <img src="/spending.png" alt="" />
                </div>
                <div className='h-full flex w-2/4 flex-col gap-3 py-7 px-5'>
                    <h1 className=' font-bold text-xl text-slate-800 dark:text-white'>Total Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-xl text-slate-400'>₹{total}</h1>
                </div>
                <div className='absolute top-3 right-6  group text-end font-medium text-slate-400 p-1 cursor-pointer'>
                    Lifetime
                    <div className=' text-slate-800 shadow-md shadow-black absolute border bg-[#f3aa4e] border-red-600 w-40 flex-col gap-3 p-3 items-center -left-10 text-center rounded-lg  hidden group-hover:flex'>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>Last 7 days</h1>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>This month</h1>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>This year</h1>
                        <h1 className='bg-white hover:bg-[#d1d1d1] rounded-lg px-4 py-2 w-36'>Custom</h1>
                    </div>
                </div>
            </div>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full rounded-3xl flex items-center px-5'>
                <div className='w-1/4  bg-[#67cadf] rounded-lg p-5'>
                    <img className='' src="/month.png" alt="" />
                </div>
                <div className=' w-2/4 h-full flex flex-col gap-3 py-7 px-5'>
                    <h1 className=' font-bold text-xl text-slate-800 dark:text-white'>Last month Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-xl text-slate-400'>₹{month}</h1>
                </div>
            </div>
            <div className='col-span-4 bg-white dark:bg-[#353148] h-full rounded-3xl flex items-center px-5'>
                <div className='w-1/4  bg-[#f54f5f] rounded-lg p-5'>
                    <img src="/travel-bag.png" alt="" />
                </div>
                <div className='h-full flex flex-col gap-3 py-7 px-5'>
                    <h1 className=' font-bold text-xl text-slate-800 dark:text-white'>Last trip Spendings</h1>
                    <h1 className='font-SourceCodePro font-bold text-xl text-slate-400'>₹6000</h1>
                </div>
            </div>
        </div>
    )
}

export default Spending
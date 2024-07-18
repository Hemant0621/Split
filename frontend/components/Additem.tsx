import axios from 'axios'
import React, { useState } from 'react'
import Message from './Message'


function Additem({ setadditem , url }: { setadditem: Function , url: string }) {

    const [show, setshow] = useState(false)
    const [heading, setheading] = useState('')
    const [type, settype] = useState('')
    const [price, setprice] = useState('')
    const [loading, setloading] = useState(false)

    function handleClick() {
        setshow(true);
        setTimeout(() => {
            setshow(false);
        }, 4000);
    };

    function handleclose() {
        setadditem(false)
    }

    return (
        <div className=' absolute left-0 top-0 w-screen h-screen flex items-center justify-center bg-opacity-80 bg-slate-500 z-10 border border-black '>
            {show ? <Message Heading={"Successfull"} message={"item added Successfully"} /> : ""}
            <button className='absolute top-5 right-5 md:top-10 md:right-10' onClick={handleclose}>
                <img className=' w-9 md:w-12' src="/cancel.png" alt="" />
            </button>
            <div className=' w-full h-1/2 mx-5 md:mx-0 md:w-2/3 md:h-3/4 bg-[#f3aa4e] dark:bg-[#353148]  rounded-xl flex flex-col justify-center gap-10 items-center p-4 md:p-0 md:py-20'>
                <div className=' w-full md:w-2/3'>
                    <label htmlFor="Heading" className="block text-black dark:text-white text-xl md:text-2xl lg:text-3xl text-left w-full font-bold mb-2">Heading</label>
                    <input className=' w-full p-2 border rounded-lg text-black' placeholder='Heading' value={heading} onChange={(e) => setheading(e.target.value)} />
                </div>
                <div className=' w-full md:w-2/3 flex gap-4 md:justify-between'>
                    <div>
                        <label htmlFor="type" className="block text-black dark:text-white text-xl md:text-2xl lg:text-3xl text-left w-full font-bold mb-2">Type</label>
                        <select className='bg-white dark:text-black p-1 py-2 md:p-3  rounded-lg border border-red-600' value={type} onChange={(e) => settype(e.target.value)}>
                            <option value="">Select Type</option>
                            <option value="daily item">Food</option>
                            <option value="Staitionary">Staitionary</option>
                            <option value="Travel">Travel</option>
                            <option value="Enternainment">Entertainment</option>
                            <option value="Daily care">Daily care</option>
                            <option value="Clothing">clothing</option>
                            <option value="Miscellaneus">Miscellaneus</option>
                        </select>
                    </div>
                    <div className='w-1/2'>
                        <label htmlFor="Price" className="block text-black dark:text-white text-xl md:text-2xl lg:text-3xl text-left w-full font-bold mb-2">Price</label>
                        <input type='number' className=' w-full p-2 border text-black border-black rounded-lg' value={price} placeholder='Price' onChange={(e) => setprice(e.target.value)} />
                    </div>

                </div>
                <div className='w-2/3 flex justify-center  md:mt-10'>
                    <button style={{ boxShadow: 'inset 0 2px 4px 0 rgb(2 6 23 / 0.3), inset 0 -2px 4px 0 rgb(203 213 225)' }} className=" text-black  inline-flex cursor-pointer items-center gap-1 rounded border border-slate-600 bg-gradient-to-b from-slate-50 to-slate-200 px-4 py-2 font-semibold hover:opacity-90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-500 focus-visible:ring-offset-2 active:opacity-100"
                        onClick={async () => {
                            setloading(true)
                            const response = await axios.post(url, {
                                heading,
                                price,
                                type,
                                date: new Date()
                            }, {
                                headers: {
                                    authorization: `Bearer ${localStorage.getItem('token')}`
                                }
                            })
                            handleClick()
                            setloading(false)
                            setprice('')
                            settype("")
                            setheading("")
                        }}
                    >
                        {loading ? "Adding..." : " Add item"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Additem
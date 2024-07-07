import React from 'react'

function Sidebar() {
    return (
        <div className='col-span-2  p-5'>
            <div className='bg-white dark:bg-[#353148] transition-colors duration-400 ease-linear flex flex-col items-center justify-between pb-10 h-full rounded-xl'>
                <div className='flex flex-col gap-5  p-5 '>
                    <img className='w-52 dark:invert' src='/Logo.png' alt='' />
                    <a href="/"><h1 className=' font-medium px-4  text-xl  p-2 bg-[#f3aa4e] dark:bg-[#111820] rounded-lg hover:bg-[#ff9b20] dark:hover:bg-[#090c10]'>Home</h1></a>
                    <a href="/Trip"><h1 className=' font-medium px-4  text-xl  p-2 bg-[#f3aa4e] dark:bg-[#111820] rounded-lg hover:bg-[#ff9b20] dark:hover:bg-[#090c10]'>Trips</h1></a>
                    <a href=""><h1 className=' font-medium px-4  text-xl  p-2 bg-[#f3aa4e] dark:bg-[#111820] rounded-lg hover:bg-[#ff9b20] dark:hover:bg-[#090c10]'>profile</h1></a>
                </div>
                <div className='flex gap-3 items-center px-5 py-2 bg-[#f3aa4e] dark:bg-[#111820] rounded-lg hover:bg-[#ff9b20] dark:hover:bg-[#090c10] cursor-pointer'
                    onClick={() => {
                        location.href = '/signin'
                        localStorage.removeItem('token')
                    }}
                >
                    <img className='h-4 dark:invert' src="/logout.png " alt="" />
                    <h1 className='font-bold  text-xl '>Logout</h1>
                </div>
            </div>
        </div>
    )
}

export default Sidebar 
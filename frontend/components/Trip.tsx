import React from 'react'

function Trip() {
    return (
        <div className='border-2 ml-5 h-5/6 rounded-lg px-5 flex flex-col justify-around'>
            <div className=' h-[30%] flex justify-around'>
                <div className='border-2 h-full w-[65%]'>

                </div>
                <div className=' h-full w-[30%] flex flex-col justify-around'>
                    <button className='w-full h-[45%] rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash'>Create a Trip party</button>
                    <button className='w-full h-[45%] rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash'>
                        <div className='w-full group-focus-within:hidden '>Join a Trip party</div>
                        <div className='w-full justify-around items-center hidden group-focus-within:flex'>
                            <input className='w-2/4 px-4 py-2 font-Clash rounded-lg text-base ' placeholder='Enter the party code '/>
                            <button className='w-1/4 focus:hidden bg-[#f3aa4e] rounded-lg p-2 font-medium font-Clash'>Join</button>
                        </div>
                    </button>
                </div>
            </div>
            <div className='border-2 h-[65%]'>

            </div>
        </div>
    )
}

export default Trip
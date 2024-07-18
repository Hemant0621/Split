import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Additem from './Additem'

function Party() {

  const code = useParams()
  const [destination, setdestination] = useState('')
  const [additem, setadditem] = useState(false)


  useEffect(() => {

    async function result() {
      const response = await axios.get("https://split-backend-five.vercel.app/api/party/group", {
        params: {
          id: code.id
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      setdestination(response.data.location)
    }

    result()

  }, [])

  return (
    <div className='border-2 ml-5 h-5/6 rounded-lg flex flex-col justify-around'>
      {additem ? <Additem setadditem={setadditem} url='https://split-backend-five.vercel.app/api/party/add'/> : ''}
      <div className=' h-[30%] flex justify-around'>
        <div className='border-2 h-full w-[68%]'>
        </div>
        <div className=' h-full w-[30%] flex flex-col justify-around'>
          <button className='w-full h-[45%] rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash border border-black'
            onClick={async () => {
              setadditem(true)
            }}
          >Add Expensis</button>
          <button className='w-full h-[45%] rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash border border-black'>
            Split Eqaully
          </button>
        </div>
      </div>
      <div className=' h-[65%] flex justify-between '>

        <div className=' w-full md:w-[56%] bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl h-full border border-black'>
          <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Trip Members</h1>
          <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
            <div className=' px-2 md:px-5 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
              <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-left '>Name</h1>
              <h1 className=' w-1/4 font-medium font-Clash text-base md:text-lg text-center '>Expensis</h1>
              <h1 className=' w-1/4 font-medium font-Clash text-sm md:text-base text-center '>Net Bill</h1>
            </div>

            <div className=' px-2 md:px-5 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>
              {/* 
              {trips.length > 0 ? trips.map((trip: {
                Id: string,
                partyGroups: [{
                  location: string,
                  total: {
                    $numberDecimal: Number
                  }
                }],
                date: string,
                _id: string

              }) => (
                <div key={trip._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300  cursor-pointer'
                  onClick={() => location.href = `/Trip/${trip.Id}`}
                >
                  <h1 className='w-1/4 text-left text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].location}</h1>
                  <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{trip.Id}</h1>
                  <h1 className='w-1/4 text-center text-xs md:text-sm break-words px-1'>{trip.partyGroups[0].total.$numberDecimal.toString()}</h1>
                  <h1 className='w-1/4 text-right text-xs md:text-sm break-words px-1'>{trip.date}</h1>
                </div>
              )) :  */}
              <div className='text-center font-medium text-base md:text-xl'>No Trips yet</div>

            </div>
          </div>
        </div>

        <div className='w-full md:w-[42%] bg-white rounded-xl border border-black'>

        </div>

      </div>
    </div>
  )
}

export default Party
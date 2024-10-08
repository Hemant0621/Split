import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Additem from './Additem'
import { DATABASE_URL } from '@/config'

function Party() {

  const code = useParams()
  const [group, setgroup] = useState({
    location: 'loading...',
    date: 'loading...',
    total: {
      $numberDecimal: 'loading...'
    }
  })
  const [url, seturl] = useState('')
  const [partyuser, setpartyuser] = useState([])
  const [transaction, settransaction] = useState([])
  const [additem, setadditem] = useState(false)
  const [settled, setsettled] = useState(false)
  const [Refresh, setRefresh] = useState(true)

  useEffect(() => {

    async function result() {
      const response = await axios.get(`${DATABASE_URL}/party/trip`, {
        params: {
          id: code.id
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      console.log(response.data)
      if(response.data=="user not found"){
        alert("You no longer belong to this Trip")
        location.href = "/Trip"
      }
      else{
        setpartyuser(response.data.partyuser)
        setgroup(response.data.group)
      }
    }

    result()

  }, [Refresh])

  return (
    <div className=' h-5/6 flex flex-col justify-between px-5 bg-[#f3aa4e] dark:bg-[#111820] transition-colors duration-400 ease-linear'>
      {additem ? <Additem setadditem={setadditem} url={url} Refresh={Refresh} setRefresh={setRefresh} /> : ''}
      <div className=' md:h-[30%] flex md:flex-row flex-col-reverse justify-around'>
        <div className=' md:h-full w-full md:w-[68%] flex flex-col justify-between items-center '>

          <div className='h-[49%] w-full flex justify-between'>
            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
              <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#f54f5f] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                <img className='w-full h-full' src="/password.png" alt="" />
              </div>
              <div className=' w-2/3  h-full flex flex-col justify-center'>
                <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Code</h1>
                <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>{code.id}</h1>
              </div>
            </div>
            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
              <div className='w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#27d095] rounded-lg ml-1 md:rounded-2xl p-2 m-2'>
                <img className='w-full h-full' src="/spending.png" alt="" />
              </div>
              <div className=' w-2/3  h-full flex flex-col justify-center'>
                <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Total expense</h1>
                <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>₹{group.total.$numberDecimal}</h1>
              </div>
            </div>
          </div>

          <div className='h-[49%] w-full flex justify-between'>
            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
              <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#67cadf] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                <img className='w-full h-full' src="/location.png" alt="" />
              </div>
              <div className=' w-2/3  h-full flex flex-col justify-center'>
                <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Location</h1>
                <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>{group.location}</h1>
              </div>
            </div>
            <div className='h-full w-[49%] bg-white dark:bg-[#353148] rounded-lg border border-black flex items-center justify-around'>
              <div className=' w-1/4 md:w-[5vw] lg:w-[4vw]  bg-[#ff9f60] ml-1 rounded-lg md:rounded-2xl p-2 m-2'>
                <img className='w-full h-full' src="/date.png" alt="" />
              </div>
              <div className=' w-2/3  h-full flex flex-col justify-center'>
                <h1 className=' font-bold text-[3.5vw] md:text-[1.4vw] text-slate-800 dark:text-white'>Date</h1>
                <h1 className='font-SourceCodePro font-bold text-[3.5vw] md:text-[2vw] lg:text-[1.2vw] text-slate-400'>{group.date == 'loading...' ? 'loading...' : new Date(group.date).toLocaleDateString()}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className=' md:h-full w-full md:w-[30%] flex md:flex-col justify-between '>
          <button className='w-[49%] md:w-full md:h-[49%] py-3 md:my-0 my-2 rounded-xl bg-[#32ed80] hover:bg-[#11c15b] font-bold font-Clash border border-black'
            onClick={async () => {
              seturl(`${DATABASE_URL}/party/add`)
              setadditem(true)
            }}
          >Add Expensis</button>
          <button className='w-[49%] md:w-full md:h-[49%] py-3 md:my-0 my-2 rounded-xl bg-[#91baff] hover:bg-[#448aff] group font-bold font-Clash border border-black'
            onClick={async () => {
              seturl(`${DATABASE_URL}/party/split`)
              setadditem(true)
            }}
          >
            Split Eqaully
          </button>
        </div>
      </div>
      <div className='h-screen md:h-[65%] flex md:flex-row flex-col justify-between '>
        <div className=' w-full md:w-[56%] bg-white dark:bg-[#353148] rounded-xl md:rounded-2xl h-[49%] md:h-full border border-black my-5 md:my-0'>
          <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Trip Members</h1>
          <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
            <div className=' px-2 md:px-5 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
              <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>Name</h1>
              <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>Expensis</h1>
              <h1 className=' w-1/4 font-semibold font-Clash text-sm md:text-base text-center '>Net Bill</h1>
              <h1 className=' w-1/4 font-semibold font-Clash text-sm md:text-base text-center '>Delete</h1>
            </div>

            <div className=' px-2 md:px-5 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>
              {partyuser.length > 0 ? partyuser.map((party: {
                user: [{
                  firstName: string,
                  lastName: string,
                }],
                balance: {
                  $numberDecimal: string
                },
                total: {
                  $numberDecimal: string
                },
                _id: string,
                userId: string

              }) => (
                <div key={party._id} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300  cursor-pointer border border-black'
                onClick={()=>location.href=`/${party.userId}`}
                >
                  <h1 className='w-1/4 text-left font-medium text-xs md:text-sm break-words px-1'>{`${party.user[0].firstName}  ${party.user[0].lastName}`}</h1>
                  <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{party.total.$numberDecimal}</h1>
                  <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{party.balance.$numberDecimal}</h1>
                  <button className='w-1/5 text-center font-medium text-xs md:text-sm break-words px-1 bg-black text-white rounded-lg transition-transform transform hover:scale-110 py-1'
                    onClick={async () => {
                      const check = confirm(`DO you want to delete ${party.user[0].firstName}  ${party.user[0].lastName} member `)
                      if (check) {
                        const response = await axios.delete(`${DATABASE_URL}/party/party`, {
                          params: {
                            Id: party.userId
                          },
                          headers: {
                            authorization: `Bearer ${localStorage.getItem('token')}`
                          }
                        })
                        if (response.data == "deleted") {
                          setRefresh(!Refresh)
                        }
                        else if(response.data == "can't delete"){
                          alert("Cant Delete Yourself ")
                        }
                      }
                    }}
                  >Delete</button>
                </div>
              )) :
                <div className='text-center font-medium text-base md:text-xl'>No Members yet</div>
              }
            </div>
          </div>
        </div>

        <div className='w-full md:w-[42%] h-[49%] md:h-full bg-white dark:bg-[#353148] rounded-xl border border-black'>
          {settled
            ?
            <div>
              <h1 className='w-full text-center font-bold text-base md:text-lg lg:text-2xl pt-2'>Settled Transaction</h1>
              <div className='w-full h-full flex flex-col gap-3 px-1 md:px-5  scrollbar scrollbar-track-rounded-lg scrollbar-thumb-rounded-lg scrollbar-thumb-black dark:scrollbar-thumb-white scrollbar-track-[#f3aa4e] dark:scrollbar-track-[#111820] '>
                <div className=' px-2 md:px-5 py-2 flex w-full justify-between border-4 border-white dark:border-[#353148] border-b-[#f3aa4e] dark:border-b-[#111820] '>
                  <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>From</h1>
                  <h1 className=' w-1/4 font-semibold font-Clash text-base md:text-lg text-center '>To</h1>
                  <h1 className=' w-1/4 font-semibold font-Clash text-sm md:text-base text-center '>Amount</h1>
                </div>

                <div className=' px-2 md:px-5 scrollbar-thin h-[75%] py-1 overflow-y-auto flex flex-col gap-2 '>
                  {transaction.length > 0 ? transaction.map((transfer: {
                    from: string,
                    to: string,
                    amount: string,
                  }) => (
                    <div key={transfer.from} className='flex justify-between w-full bg-[#f3aa4e] dark:bg-[#111820] rounded-lg p-2 md:p-3 transition-transform transform hover:scale-105 duration-300  cursor-pointer border border-black'>
                      <h1 className='w-1/4 text-left font-medium text-xs md:text-sm break-words px-1'>{transfer.from}</h1>
                      <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{transfer.to}</h1>
                      <h1 className='w-1/4 text-center font-medium text-xs md:text-sm break-words px-1'>{transfer.amount}</h1>
                    </div>
                  )) :
                    <div className='text-center font-medium text-base md:text-xl'>No Transaction needed</div>
                  }
                </div>
              </div>
            </div>
            :
            <div className='flex justify-center items-center h-full w-full'>
              <button
                className="inline-flex items-center px-4 py-2 bg-[#f3aa4e] dark:bg-[#111820] hover:bg-[#ff9b20] dark:hover:bg-[#090c10] dark:text-white transition ease-in-out delay-75 text-black text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                onClick={async () => {
                  const response = await axios.get(`${DATABASE_URL}/party/settle`, {
                    params: {
                      Id: code.id
                    },
                    headers: {
                      authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                  settransaction(response.data)
                  console.log(response.data)
                  setsettled(true)
                }}
              >
                Settle The payments
              </button>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Party
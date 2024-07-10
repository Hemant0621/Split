import React, { useEffect, useState } from 'react'
import Spending from './Spending'
import Spendinggrapgh from './Spendinggrapgh'
import { useRecoilState } from 'recoil'
import { loadingState } from '@/hooks/darkmode'



function Dashboard() {


    return (
        <div className='w-full h-screen transition-colors flex flex-col gap-5 duration-400 ease-linear p-5 bg-[#f3aa4e] dark:bg-[#111820]'>
            <Spending />
            <Spendinggrapgh />
        </div>
    )
}

export default Dashboard
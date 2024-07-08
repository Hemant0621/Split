import React, { useEffect, useState } from 'react'
import Spending from './Spending'
import Spendinggrapgh from './Spendinggrapgh'
import { useRecoilState } from 'recoil'
import { loadingState } from '@/hooks/darkmode'



function Dashboard() {


    return (
        <div className='col-span-10 transition-colors h-full duration-400 ease-linear p-5'>
            <Spending />
            <Spendinggrapgh />
        </div>
    )
}

export default Dashboard
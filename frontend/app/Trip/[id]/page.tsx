'use client'
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar'
import Party from '@/components/Party';
import { darkModeState } from '@/hooks/darkmode';
import React, { useEffect, useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil';
import axios from 'axios';
import { DATABASE_URL } from '@/config';

function Page() {

    if (typeof window !== 'undefined') {
      if (!window.localStorage.getItem('token')) {
        window.location.href = '/signup'
      }
    }
    return (
      <RecoilRoot>
        <MainApp />
      </RecoilRoot>
    );
  }
  
  const MainApp = () => {
  
    const [dark, setDark] = useRecoilState(darkModeState);

    useEffect(() => {
      async function dark() {
        const response = await axios.get(`${DATABASE_URL }/user`, {
          params: {
            userId: 'admin'
          },
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(response.data.mode)
        if(response.data.user.mode=='light'){
          setDark(false)
        }
        else if(response.data.user.mode=='dark'){
          setDark(true)
        }
        
      }
      dark()
    })
  
    return (
      <div className={`grid grid-cols-12 w-full md:overflow-y-hidden font-Clash ${dark ? "dark" : ""} transition-colors duration-400 ease-linear bg-[#f3aa4e] dark:bg-[#111820] dark:text-white `}>
        <Sidebar />
        <div className=" col-span-12 md:col-span-10 bg-[#f3aa4e] dark:bg-[#111820] md:h-screen flex flex-col ">
          <Navbar />
          <Party/>
        </div>
      </div>
    );
  
  };
  

export default Page
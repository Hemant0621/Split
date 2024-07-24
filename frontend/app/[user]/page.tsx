'use client'
import Navbar from '@/components/Navbar';
import Profile from '@/components/Profile';
import Sidebar from '@/components/Sidebar'
import Trip from '@/components/Trip';
import { darkModeState } from '@/hooks/darkmode';
import React, { useState } from 'react'
import { RecoilRoot, useRecoilState } from 'recoil';

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
    const [RefreshAvatar , setRefreshAvatar] = useState(true)
  
    return (
      <div className={`grid grid-cols-12 w-full md:overflow-y-hidden font-Clash ${dark ? "dark" : ""} transition-colors duration-400 ease-linear bg-[#f3aa4e] dark:bg-[#111820] dark:text-white `}>
        <Sidebar />
        <div className=" col-span-12 md:col-span-10 bg-[#f3aa4e] dark:bg-[#111820] md:h-screen flex flex-col ">
          <Navbar RefreshAvatar={RefreshAvatar} />
          <Profile setRefreshAvatar={setRefreshAvatar}/>
        </div>
      </div>
    );
  
  };
  

export default Page
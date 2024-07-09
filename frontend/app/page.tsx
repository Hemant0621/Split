'use client'

import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { darkModeState } from "@/hooks/darkmode";
import { useEffect, useState } from "react";
import { RecoilRoot, useRecoilState } from 'recoil';

export default function Home() {

  return (
    <RecoilRoot>
      <MainApp />
    </RecoilRoot>
  );
}

const MainApp = () => {

  const [dark, setDark] = useRecoilState(darkModeState);


    if (typeof window !== 'undefined'){
      if(!window.localStorage.getItem('token')){
        window.location.href = '/signup'
        return <></>
      }
    }
    else{
      return (
        <div className={`grid grid-cols-12 w-full h-screen overflow-y-hidden font-Clash ${dark ? "dark" : ""} transition-colors duration-400 ease-linear bg-[#f3aa4e] dark:bg-[#111820] dark:text-white `}>
          <Sidebar />
          <div className="col-span-10 h-screen flex flex-col justify-between">
            <Navbar />
            <Dashboard />
          </div>
        </div>
      );
    }
};

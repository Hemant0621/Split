'use client'
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

export default function Home() {

  const [dark, setdark] = useState<boolean>(false)

  return (
    <div className={`grid grid-cols-12 w-screen h-screen font-Clash ${dark ? "dark" : ""} bg-[#f3aa4e] dark:bg-[#111820] dark:text-white`}>
      <Sidebar />
      <div className="col-span-10">
        <Navbar dark={dark} setdark={setdark} />
        <Dashboard />
      </div>
    </div>
  );
}

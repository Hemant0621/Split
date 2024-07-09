'use client'
import Sidebar from '@/components/Sidebar'
import React, { useState } from 'react'

function page() {
    const [dark, setdark] = useState<boolean>(false)

    return (
        <div className={`grid grid-cols-12 w-screen h-screen font-Clash ${dark ? "dark" : ""}`}>
            <Sidebar />
            <div>
            </div>
        </div>
    );
}

export default page
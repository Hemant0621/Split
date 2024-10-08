'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { DATABASE_URL } from '@/config'

function Signincomponent() {
    const [Email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={async () => {

                            const response = await axios.post(`${DATABASE_URL}/user/signin`, {
                                Email,
                                password
                            }, {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Type": "application/json",
                                }
                            }).catch((error)=>{
                                alert(error.response.data.message)
                            }).then((response)=>{
                                if(response?.data.token){
                                    localStorage.setItem('token', response?.data.token)
                                    location.href='/'
                                }
                            })
                        }}>Sign In</button>
                        <a href="/signup" className="text-blue-500 hover:underline">Register for new user?</a>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signincomponent
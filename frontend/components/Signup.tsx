'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { DATABASE_URL } from '@/config'

function Signupcomponent() {

    const [Email, setEmail] = useState('')
    const [firstName, setfirstName] = useState('')
    const [username, setusername] = useState('')
    const [lastName, setlastName] = useState('')
    const [password, setpassword] = useState('')



    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">Email</label>
                        <input type="email" id="Email" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                        <input type="text" id="Username" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setusername(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">firstName</label>
                        <input type="text" id="firstName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setfirstName(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">lastName</label>
                        <input type="text" id="lastName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setlastName(e.target.value) }} />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                        <input type="password" id="password" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required onChange={(e) => { setpassword(e.target.value) }} />
                    </div>
                    <div className="flex items-center justify-between">
                        <button type='button' className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={async () => {
                            const response = await axios.post(`${DATABASE_URL}/user/signup`,
                                {
                                    Email,
                                    username,
                                    firstName,
                                    lastName,
                                    password
                                }, {
                                headers: {
                                    "Access-Control-Allow-Origin": "*",
                                    "Content-Type": "application/json",
                                }
                            })
                            console.log(response.data)
                            if (response.data.token) {
                                localStorage.setItem('token', response.data.token)
                                location.href = '/'
                            }
                            else {
                                alert(response.data.message)
                            }

                        }}>Sign Up</button>
                        <a href="/signin" className="text-blue-500 hover:underline" >Already have an account?</a>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Signupcomponent
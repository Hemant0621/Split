'use client'
import React, { useState } from 'react'
import axios from 'axios'
import { DATABASE_URL } from '@/config'

function Signupcomponent() {
    const [formData, setFormData] = useState({
        Email: '',
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    });

    const [errors, setErrors] = useState<Partial<{
        Email: string,
        firstName: string,
        lastName: string,
        username: string,
        password: string
    }>>({});

    const validateForm = () => {
        let formErrors: Partial<{
            Email: string,
            firstName: string,
            lastName: string,
            username: string,
            password: string
        }> = {};
        if (!formData.Email) formErrors.Email = 'Email is required';
        if (!formData.firstName) formErrors.firstName = 'First name is required';
        if (!formData.lastName) formErrors.lastName = 'Last name is required';
        if (!formData.username) formErrors.username = 'Username is required';
        if (!formData.password) formErrors.password = 'Password is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    return (
        <div className="max-h-screen max-w-screen flex">
            <div className="bg-white rounded-r-xl h-screen shadow-lg w-2/5 flex justify-center items-center">
                <div className="w-4/5">
                    <h2 className="text-2xl font-bold mb-6">
                        Welcome, Sign Up to get started
                    </h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="Email" className="block text-gray-700 font-bold mb-2">Email</label>
                            <input 
                                type="email" 
                                id="Email" 
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                required 
                                onChange={(e) => { setFormData({ ...formData, Email: e.target.value }) }} 
                            />
                            {errors.Email && <p className='text-red-600 my-1'>*Email Field is required</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
                            <input 
                                type="text" 
                                id="username" 
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                required 
                                onChange={(e) => { setFormData({ ...formData, username: e.target.value }) }} 
                            />
                            {errors.username && <p className='text-red-600 my-1'>*Username Field is required</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="firstName" className="block text-gray-700 font-bold mb-2">First Name</label>
                            <input 
                                type="text" 
                                id="firstName" 
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                required 
                                onChange={(e) => { setFormData({ ...formData, firstName: e.target.value }) }} 
                            />
                            {errors.firstName && <p className='text-red-600 my-1'>*First name Field is required</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lastName" className="block text-gray-700 font-bold mb-2">Last Name</label>
                            <input 
                                type="text" 
                                id="lastName" 
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                required 
                                onChange={(e) => { setFormData({ ...formData, lastName: e.target.value }) }} 
                            />
                            {errors.lastName && <p className='text-red-600 my-1'>*Last name Field is required</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                className="w-full px-4 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
                                required 
                                onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} 
                            />
                            {errors.password && <p className='text-red-600 my-1'>*Password Field is required</p>}
                        </div>
                        <div className="flex items-center justify-between">
                            <button 
                                type='button' 
                                className="bg-[#f3aa4e] text-white px-4 py-2 rounded-lg hover:bg-[#eb9021]" 
                                onClick={async () => {
                                    if (!validateForm()) {
                                        alert("Please fill in all required fields");
                                        return;
                                    }
                                    else {
                                        const response = await axios.post(`${DATABASE_URL}/user/signup`,
                                            {
                                                Email: formData.Email,
                                                username: formData.username,
                                                firstName: formData.firstName,
                                                lastName: formData.lastName,
                                                password: formData.password
                                            }, {
                                            headers: {
                                                "Access-Control-Allow-Origin": "*",
                                                "Content-Type": "application/json",
                                            }
                                        }).catch((error) => {
                                            alert(error.response.data.message)
                                        }).then((response)=>{
                                            if(response?.data.token){
                                                localStorage.setItem('token', response?.data.token)
                                                location.href = '/'
                                            }
                                        })
                                    }
                                }}
                            >
                                Sign Up
                            </button>
                            <a href="/signin" className="text-blue-500 hover:underline">Already have an account?</a>
                        </div>
                    </form>
                </div>
            </div>
            <img className="w-3/5" src="/sign.gif" alt="" />
        </div>
    )
}

export default Signupcomponent
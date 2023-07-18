'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';


const SignUp = () => {

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [isLogin, setIsLogin] = useState(true);
    return (
        <section>
            <div className="flex flex-col items-center justify-center px-3 py-8  md:h-screen">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            {isLogin ? `Login to Account` : `Create and account`}
                        </h1>
                        <form className="space-y-4 md:space-y-6">
                            {
                                !isLogin && <div>
                                    <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                    <input type="text" name="username" id="username" className=" border border-gray-300 sm:text-sm rounded-lg focus:border-grey-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required autoComplete='off' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                                </div>
                            }
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required autoComplete='off' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            </div>
                            <button type="submit" className="w-full text-white bg-grey-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 border">{isLogin ? `Login` : `Create`} an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {isLogin ? `Don't have an account?` : `Already have an account?`} <span className="font-medium text-primary-600 hover:underline dark:text-primary-500 cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? `Sign Up` : `Login here`}</span>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp;
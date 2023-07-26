'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter} from 'next/navigation'


const SignUp = () => {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        userName: "",
    });
    const [isLogin, setIsLogin] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleAuthentication = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const { email, password, userName } = user;
            setLoading(true);
            if (!isLogin) {
                const response = await axios.post('/api/users/signup', {
                    email, password, userName
                });
                toast.success("Registration Success");
                console.log("This is my response : ", response);
                router.push('/');
            } else {
                const response = await axios.post('/api/users/signin', {
                    email, password
                });
                toast.success("Login   Success");
                console.log("This is my response : ", response);
                router.push('/');
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!isLogin) {
            if (user.email.length >= 3 && user.password.length >= 3 && user.userName.length >= 3) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        } else {
            if (user.email.length >= 3 && user.password.length >= 3) {
                setButtonDisabled(false);
            } else {
                setButtonDisabled(true);
            }
        }
    }, [user]);

    useEffect(() => {
        setUser({
            email: "",
            password: "",
            userName: "",
        });
        
    }, [isLogin]);

    
    return (
        <section>
            <div className="flex flex-col items-center justify-center px-3 py-8  md:h-screen">
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                            {isLogin ? `Login to Account` : `Create and account`}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleAuthentication(e)}>
                            {
                                !isLogin && <div>
                                    <label htmlFor="Username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">User name</label>
                                    <input type="text" name="userName" id="userName" className=" border border-gray-300 sm:text-sm rounded-lg focus:border-grey-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="user name" required autoComplete='off' value={user.userName} onChange={(e) => setUser({ ...user, userName: e.target.value })} />
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
                            <button type="submit" className="w-full text-white bg-grey-600 hover:bg-primary-700  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 border" disabled={buttonDisabled}>{isLogin ? `Login` : `Create`} an account</button>
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
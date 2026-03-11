"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        username: "",
        email: "",
        password: "",
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    
    useEffect(() => {
        if(user.username.length > 0 && user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    const[loading, setLoading] = React.useState(false);

    const onsignup = async () => {

        try {
           setLoading(true);
           const response = await axios.post("/api/users/signup", user);
           console.log("signup response", response);
           toast.success(response.data.message);
              router.push("/login");
        }
        catch (error:any) {
            console.log("signup error", error);
            toast.error(error.response?.data?.message || "Signup failed");
        }
        finally {
            setLoading(false);
        }
    }


    
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    {loading ? "Processing..." : "Sign Up"}
                </h1>

                <div className="mb-4">
                    <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-300">Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your username"
                        value={user.username}
                        onChange={(e) => setuser({ ...user, username: e.target.value })}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={user.email}
                        onChange={(e) => setuser({ ...user, email: e.target.value })}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Enter your password"
                        value={user.password}
                        onChange={(e) => setuser({ ...user, password: e.target.value })}
                        className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <button
                    onClick={onsignup}
                    disabled={buttonDisabled}
                    className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    Sign Up
                </button>

                <p className="mt-4 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
                </p>
            </div>
        </div>
    )
}
"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import React from "react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = React.useState<any>(null);

    const onlogout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        } catch (error: any) {
            console.log("logout error", error);
        }
    };

    const getuserdata = async () => {
        try {
            const response = await axios.get("/api/users/me");
            setData(response.data.user);
        } catch (error: any) {
            console.log("get user data error", error);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg text-center">
                <h1 className="mb-4 text-3xl font-bold text-white">Profile</h1>
                <p className="mb-6 text-gray-400">Welcome! You are logged in.</p>

                {data && (
                    <div className="mb-6 rounded-lg bg-gray-800 p-4 text-left">
                        <p className="text-sm text-gray-400">Username: <span className="text-white">{data.username}</span></p>
                        <p className="text-sm text-gray-400">Email: <span className="text-white">{data.email}</span></p>
                    </div>
                )}

                <button
                    onClick={getuserdata}
                    className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700"
                >
                    Get User Data
                </button>
                <button
                    onClick={onlogout}
                    className="mt-4 w-full rounded-lg bg-red-600 py-2.5 font-semibold text-white transition hover:bg-red-700"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}   
           
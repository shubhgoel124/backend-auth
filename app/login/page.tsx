"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setuser] = React.useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);

    const onlogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("login response", response);
            router.push("/profile");
        } catch (error: any) {
            console.log("login error", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    {loading ? "Processing..." : "Login"}
                </h1>

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
                    onClick={onlogin}
                    className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    Login
                </button>

                <p className="mt-3 text-center text-sm">
                    <Link href="/forgotpassword" className="text-blue-400 hover:underline">Forgot password?</Link>
                </p>

                <p className="mt-2 text-center text-sm text-gray-400">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-blue-400 hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
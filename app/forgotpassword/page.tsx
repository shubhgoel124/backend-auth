"use client";
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        try {
            setLoading(true);
            setError("");
            await axios.post("/api/users/forgotpassword", { email });
            setSent(true);
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg">
                <h1 className="mb-6 text-center text-3xl font-bold text-white">
                    Forgot Password
                </h1>

                {sent ? (
                    <div className="text-center">
                        <p className="mb-4 text-green-400">
                            A password reset link has been sent to your email.
                        </p>
                        <Link href="/login" className="text-blue-400 hover:underline">
                            Back to Login
                        </Link>
                    </div>
                ) : (
                    <>
                        <p className="mb-4 text-sm text-gray-400">
                            Enter your email address and we&apos;ll send you a link to reset your password.
                        </p>

                        <div className="mb-6">
                            <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

                        <button
                            onClick={onSubmit}
                            disabled={loading || !email}
                            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-400">
                            Remember your password?{" "}
                            <Link href="/login" className="text-blue-400 hover:underline">Login</Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}

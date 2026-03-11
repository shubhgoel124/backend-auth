"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const onSubmit = async () => {
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        try {
            setLoading(true);
            setError("");
            await axios.post("/api/users/resetpassword", { token, password });
            setSuccess(true);
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
                    Reset Password
                </h1>

                {!token && (
                    <p className="text-center text-gray-400">
                        Invalid reset link. Please request a new one from{" "}
                        <Link href="/forgotpassword" className="text-blue-400 hover:underline">here</Link>.
                    </p>
                )}

                {token && success && (
                    <div className="text-center">
                        <p className="mb-4 text-green-400">Password reset successfully!</p>
                        <Link href="/login" className="text-blue-400 hover:underline">Go to Login</Link>
                    </div>
                )}

                {token && !success && (
                    <>
                        <div className="mb-4">
                            <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-300">New Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Enter new password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-300">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
                            />
                        </div>

                        {error && <p className="mb-4 text-sm text-red-400">{error}</p>}

                        <button
                            onClick={onSubmit}
                            disabled={loading || !password || !confirmPassword}
                            className="w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

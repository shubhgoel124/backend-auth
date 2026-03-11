"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";

export default function VerifyEmailPage() {
    const searchParams = useSearchParams();
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) return;

        const verifyEmail = async () => {
            try {
                setLoading(true);
                await axios.post("/api/users/verifyemail", { token });
                setVerified(true);
            } catch (err: any) {
                setError(err.response?.data?.message || "Verification failed");
            } finally {
                setLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg text-center">
                <h1 className="mb-4 text-3xl font-bold text-white">Verify Your Email</h1>

                {loading && <p className="text-gray-400">Verifying...</p>}

                {verified && (
                    <div>
                        <p className="mb-4 text-green-400">Email verified successfully!</p>
                        <Link href="/login" className="text-blue-400 hover:underline">Go to Login</Link>
                    </div>
                )}

                {error && <p className="text-red-400">{error}</p>}

                {!token && !loading && !verified && (
                    <p className="text-gray-400">No verification token found. Please check your email for the link.</p>
                )}
            </div>
        </div>
    );
}
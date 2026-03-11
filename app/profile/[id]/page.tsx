export default async function UserProfile({ params }: any) {
    const { id } = await params;
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-950">
            <div className="w-full max-w-md rounded-xl bg-gray-900 p-8 shadow-lg text-center">
                <h1 className="mb-4 text-3xl font-bold text-white">User Profile</h1>
                <p className="rounded-lg bg-gray-800 px-4 py-3 text-lg text-blue-400">
                    User ID: <span className="font-mono font-semibold">{id}</span>
                </p>
            </div>
        </div>
    );
}
import { getDataFromToken } from "@/helpers/getdatafromtoken";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/dbconfig/dbconfig";
import User from "@/models/usermodel";

connectToDatabase();

export async function GET(request: NextRequest) {
    try {
        const userId = await getDataFromToken(request);
        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findById(userId).select("-password");
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
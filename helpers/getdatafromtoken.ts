import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function getDataFromToken(request: NextRequest) {
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            return null;
        }

        const decoded:any= jwt.verify(token, process.env.JWT_SECRET!);
        return decoded.id;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null;
    }
}   
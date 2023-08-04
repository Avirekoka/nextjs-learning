import { NextResponse } from 'next/server';

export const GET = async () => {
    try {
        const response = NextResponse.json({ message: "Logout successfully", success: true });

        response.cookies.delete("token");
        
        return response;
    } catch (error: any) {
        return NextResponse.json({ status: 500, error: error.message });
    }
}
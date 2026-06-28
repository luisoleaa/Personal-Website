import { NextResponse } from "next/server";


export async function GET(request: Request) {
    const token = process.env.GITHUB_TOKEN;
    const res = await fetch("https://api.github.com/users/luisoleaa/events", {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github+json",

        },
    });

    if(!res.ok){
        return NextResponse.json({error: "Failed to fetch"}, {status: res.status})
    }
    const data = await res.json();
    return NextResponse.json(data);
}
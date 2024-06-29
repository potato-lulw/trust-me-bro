import { prisma } from "@/prisma/client"
import { NextResponse } from "next/server";


export async function GET(request) {
    const posts = await prisma.posts.findMany();
    if (posts.length > 0) {

        return NextResponse.json(posts);
    }
    return NextResponse.json({ mssg: "No Posts" }, { status: 404 });
}


export async function POST(request) {
    const data = await request.json();

    const post = await prisma.posts.create({
        data: {
            event: data.event,
            date: data.date,
            links: data.links
        }
    });

    return NextResponse.json(post, { status: 201 });
}



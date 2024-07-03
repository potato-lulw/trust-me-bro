
import { NextResponse } from "next/server";
import Post from "@/models/Post";
import connectDb from "@/lib/db"; 

// Function to handle GET requests
export async function GET(request) {
    try {
        await connectDb(); // Connect to the database
        const posts = await Post.find({}).exec(); // Fetch all posts
        if (posts.length > 0) {
            return NextResponse.json(posts); // Return posts if found
        } else {
            return NextResponse.json({ mssg: "No Posts" }, { status: 404 }); // Return 404 if no posts
        }
    } catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ mssg: "Failed to fetch posts" }, { status: 500 }); // Handle errors
    }
}

// Function to handle POST requests
export async function POST(request) {
    try {
        await connectDb(); // Connect to the database
        const data = await request.json(); // Parse JSON body

        const post = await Post.create({
            event: data.event,
            date: data.date,
            links: data.links
        });

        return NextResponse.json(post, { status: 201 }); // Return the newly created post
    } catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ mssg: "Failed to create post" }, { status: 500 }); // Handle errors
    }
}

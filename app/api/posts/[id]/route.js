
import { NextResponse } from 'next/server';
import Post from '@/models/Post'; 
import connectDb from '@/lib/db'; 

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await connectDb(); // Connect to the database
    const result = await Post.findByIdAndDelete(id); // Delete the post by its _id

    if (!result) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

// app/api/posts/[id]/route.js

import { prisma } from '@/prisma/client';
import { NextResponse } from 'next/server';

export async function DELETE(request, { params }) {
  const { id } = params;

  try {
    await prisma.posts.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

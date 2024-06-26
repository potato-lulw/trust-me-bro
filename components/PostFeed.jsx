"use client"
import React, { useEffect, useState } from 'react';

const PostFeed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/posts');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPosts(data); // Assuming your API returns an array of posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        getPosts();
    }, []);

    return (
        <div className='mt-2'>
            <h2>Posts</h2>
            {posts ? (
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <p>Event: {post.event}</p>
                            <p>Date: {post.date}</p>
                            <p>Links: {post.links}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostFeed;

"use client"
import React, { useEffect, useState } from 'react';
import Post from './post';

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
            {/* <h2>Posts</h2> */}
            {posts ? (
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-4 gap-y-8'>
                    {posts.map(post => (
                        <Post key={post.id} post ={post}/>
                    ))}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PostFeed;

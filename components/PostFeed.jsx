"use client";
import React, { useEffect, useState } from 'react';
import Post from './post';
import Hero from './Hero';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className='mt-2 flex flex-col items-center'>
      <div className=''><Hero /></div>
      {posts.length > 0 ? (
        <div className={`w-full ${posts.length === 1 ? 'flex justify-center' : 'grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4 gap-y-8 px-2'}`}>
          {posts.map((post) => (
            <Post key={post.id} post={post} onDelete={handleDeletePost} />
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PostFeed;

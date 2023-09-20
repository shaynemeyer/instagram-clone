'use client';
import { fetchAllPosts } from '@/libs/api/posts';
import React, { useEffect, useState } from 'react';
import Post from './Post';
import { PostItem } from '@/types/post';

function PostList() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  useEffect(() => {
    fetchAllPosts().then((allPosts) => {
      setPosts(allPosts);
    });
  }, []);

  return (
    <>
      {posts && (
        <div className="p-5">
          {posts?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}

export default PostList;

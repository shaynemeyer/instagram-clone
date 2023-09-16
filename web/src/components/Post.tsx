import React, { useEffect, useState } from 'react';
import { PostItem } from '../types/post';
import { config } from '../libs/constants';

interface PostProps {
  post: PostItem;
}

function Post({ post }: PostProps) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (post.image_url_type === 'absolute') {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(`${config.BASE_URL}${post.image_url}`);
    }
  }, [post.image_url_type, post.image_url]);

  return (
    <div className="flex flex-col w-2/3 mb-11 ml-auto mr-auto bg-white max-w-{500} border-2 border-gray-100 rounded-md">
      <div className="flex align-middle p-5">
        <img
          className="avatar-rd"
          alt="User Joe"
          src="https://randomuser.me/api/portraits/men/72.jpg"
        />
        <div className="flex flex-1 items-center justify-between ml-2">
          <h3>{post.user.username}</h3>
          <button className="btn-outlined">Delete</button>
        </div>
      </div>
      {imageUrl ? (
        <img
          className="w-full object-contain border-t-2 border-b-2 border-gray-50"
          src={imageUrl}
        />
      ) : null}
      <h4 className="font-normal p-5 border-b-2 border-gray-50">
        {post.caption}
      </h4>
      <div className="p-5">
        {post.comments.map((comment) => (
          <p key={comment.timestamp}>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Post;

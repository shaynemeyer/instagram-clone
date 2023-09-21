import Post from '../components/Post';
import { useFetchAllPosts } from '../libs/hooks/post';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useCallback, useState } from 'react';
import ImageUpload from '../components/Modals/ImageUpload';

function Home() {
  const [imageUpIsOpen, setImageUpIsOpen] = useState(false);
  const authContext = useAuth();
  const allPosts = useFetchAllPosts();

  const checkAuth = useCallback(() => {
    authContext.authCheck();
  }, [authContext]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      {allPosts.data && (
        <div className="p-5">
          {allPosts.data?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
      <ImageUpload isOpen={imageUpIsOpen} setIsOpen={setImageUpIsOpen} />
      {authContext.username ? (
        <button className="btn-default" onClick={() => setImageUpIsOpen(true)}>
          Upload Photo
        </button>
      ) : (
        <p>You must be logged in to upload a photo</p>
      )}
    </>
  );
}

export default Home;

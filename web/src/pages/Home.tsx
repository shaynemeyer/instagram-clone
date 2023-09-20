import Post from '../components/Post';
import { useFetchAllPosts } from '../libs/hooks/post';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useCallback } from 'react';

function Home() {
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
    </>
  );
}

export default Home;

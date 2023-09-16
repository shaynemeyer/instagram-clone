import Post from '../components/Post';
import { useFetchAllPosts } from '../libs/hooks/post';

function Home() {
  const allPosts = useFetchAllPosts();

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

import Post from '../components/Post';
import { useFetchAllPosts } from '../libs/hooks/post';

function Home() {
  const allPosts = useFetchAllPosts();

  return (
    <div>
      <h1 className="text-3xl font-bold">Hello world!</h1>
      {allPosts.data && (
        <div className="p-5">
          {allPosts.data?.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;

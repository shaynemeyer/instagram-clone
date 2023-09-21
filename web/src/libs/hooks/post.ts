import { useQuery } from 'react-query';
import { fetchAllPosts } from '../api/post';

const postsQuery = 'posts';

export function useFetchAllPosts() {
  return useQuery(postsQuery, () => fetchAllPosts());
}

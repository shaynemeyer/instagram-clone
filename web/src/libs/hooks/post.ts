import { useQuery, useMutation } from 'react-query';
import { fetchAllPosts, uploadImage } from '../api/post';

const postsQuery = 'posts';

export function useFetchAllPosts() {
  return useQuery(postsQuery, () => fetchAllPosts());
}

export function useUploadImage() {
  return useMutation(uploadImage);
}

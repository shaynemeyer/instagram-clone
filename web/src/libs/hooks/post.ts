import { useQuery, useMutation } from 'react-query';
import { fetchAllPosts, uploadImage, create } from '../api/post';

const postsQuery = 'posts';

export function useFetchAllPosts() {
  return useQuery(postsQuery, () => fetchAllPosts());
}

export function useUploadImage() {
  return useMutation(uploadImage);
}
export function useCreatePost() {
  return useMutation(create);
}

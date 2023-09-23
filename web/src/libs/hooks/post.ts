import { useQuery, useMutation } from 'react-query';
import { fetchAllPosts, uploadImage, create, deletePost } from '../api/post';

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

export function useDeletePost() {
  return useMutation(deletePost);
}

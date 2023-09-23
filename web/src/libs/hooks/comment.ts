import { useMutation } from 'react-query';
import { createComment } from '../api/comment';

export function useCreateComment() {
  return useMutation(createComment);
}

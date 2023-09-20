import { useMutation } from 'react-query';
import { sendSignup } from '../api/user';

export function useUserSignup() {
  return useMutation(sendSignup);
}

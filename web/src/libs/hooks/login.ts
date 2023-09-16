import { useMutation } from 'react-query';
import { sendLogin } from '../api/login';

export function useUserLogin() {
  return useMutation(sendLogin);
}

import { useQuery } from 'react-query';
import { currentUser } from '../api/auth';

const currentUserQuery = 'currentUser';

export function useFetchCurrentUser() {
  return useQuery(currentUserQuery, () => currentUser());
}

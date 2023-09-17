import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';
import { CurrentUserResponse } from '../../types/auth';

export async function currentUser(): Promise<CurrentUserResponse> {
  const { data } = (await axios.get(`${config.BASE_URL}users/me`, {
    withCredentials: true,
  })) as AxiosResponse<CurrentUserResponse>;

  return data;
}

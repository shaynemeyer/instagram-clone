import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';
import { LoginResponse } from '../../types/login';

export type LoginProps = {
  username: string;
  password: string;
};

export async function sendLogin({
  username,
  password,
}: LoginProps): Promise<LoginResponse> {
  const { data } = (await axios.post(
    `${config.BASE_URL}login`,
    {
      username,
      password,
    },
    {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  )) as AxiosResponse<LoginResponse>;

  return data;
}

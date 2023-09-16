import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';

export type LoginProps = {
  username: string;
  password: string;
};

export async function sendLogin({
  username,
  password,
}: LoginProps): Promise<LoginResponse> {
  const { data } = (await axios.post(`${config.BASE_URL}login`, {
    username,
    password,
  })) as AxiosResponse<LoginResponse>;

  return data;
}

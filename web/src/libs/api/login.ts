import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';

export async function sendLogin(): Promise<LoginResponse> {
  const { data } = (await axios.post(
    `${config.BASE_URL}login`
  )) as AxiosResponse<LoginResponse>;

  return data;
}

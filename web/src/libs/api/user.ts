import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';
import { UserSignupResponse } from '../../types/user';

export type SignupProps = {
  username: string;
  password: string;
  email: string;
};

export async function sendSignup({
  username,
  password,
  email,
}: SignupProps): Promise<UserSignupResponse> {
  const { data } = (await axios.post(`${config.BASE_URL}user`, {
    username,
    email,
    password,
  })) as AxiosResponse<UserSignupResponse>;

  return data;
}

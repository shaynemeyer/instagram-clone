import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';
import { CommentCreateResponse, CommentRequest } from '../../types/comment';

export async function createComment({
  username,
  text,
  post_id = 0,
}: CommentRequest): Promise<CommentCreateResponse> {
  const { data } = await axios.post(
    `${config.BASE_URL}comment`,
    {
      username,
      text,
      post_id,
    },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );

  return data;
}

import axios, { AxiosResponse } from 'axios';
import { config } from '../../libs/constants';
import { PostItem } from '../../types/post';

export async function fetchAllPosts(): Promise<Array<PostItem>> {
  const { data } = (await axios.get(
    `${config.BASE_URL}post/all`
  )) as AxiosResponse<Array<PostItem>>;

  return data;
}

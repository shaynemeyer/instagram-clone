import axios, { AxiosResponse } from 'axios';
import { config } from '@/libs/constants';
import { PostItem } from '@/types/post';

const sortNewestFirst = (data: Array<PostItem>) => {
  const result = data.sort((a: PostItem, b: PostItem) => {
    const t_a = a.timestamp.split(/[-T:]/);
    const t_b = b.timestamp.split(/[-T:]/);
    const d_a = new Date(
      Date.UTC(
        Number(t_a[0]),
        Number(t_a[1]) - 1,
        Number(t_a[2]),
        Number(t_a[3]),
        Number(t_a[4]),
        Number(t_a[5])
      )
    );
    const d_b = new Date(
      Date.UTC(
        Number(t_b[0]),
        Number(t_b[1]) - 1,
        Number(t_b[2]),
        Number(t_b[3]),
        Number(t_b[4]),
        Number(t_b[5])
      )
    );
    return Number(d_b) - Number(d_a);
  });

  return result;
};

export async function fetchAllPosts(): Promise<Array<PostItem>> {
  const { data } = (await axios.get(
    `${config.BASE_URL}post/all`
  )) as AxiosResponse<Array<PostItem>>;

  return sortNewestFirst(data);
}

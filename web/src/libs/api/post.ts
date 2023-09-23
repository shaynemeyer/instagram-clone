import axios, { AxiosResponse } from 'axios';
import { config } from '../constants';
import {
  CreatePostResponse,
  PostItem,
  UploadImageResponse,
} from '../../types/post';

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

export type CreatePostProps = {
  caption: string;
  imageUrl: string;
  imageUrlType?: string;
};

export async function create({
  caption,
  imageUrl,
  imageUrlType = 'relative',
}: CreatePostProps): Promise<CreatePostResponse> {
  const { data } = await axios.post(
    `${config.BASE_URL}post`,
    {
      image_url: imageUrl,
      image_url_type: imageUrlType,
      caption: caption,
      creator_id: localStorage.getItem('user_id'),
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

export type UploadImageProps = {
  image: File;
};

export async function uploadImage({
  image,
}: UploadImageProps): Promise<UploadImageResponse> {
  console.log({ image });
  const { data } = await axios.post(
    `${config.BASE_URL}post/image`,
    {
      image,
    },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `bearer ${localStorage.getItem('access_token')}`,
      },
    }
  );

  return data as UploadImageResponse;
}

export type DeletePostProps = {
  id: number;
};

export async function deletePost({ id }: DeletePostProps): Promise<string> {
  const { data } = await axios.delete(`${config.BASE_URL}post/delete/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${localStorage.getItem('access_token')}`,
    },
  });

  return data;
}

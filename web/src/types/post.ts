import { CommentItem } from './comment';
import { UserItem } from './user';

export type PostItem = {
  id: number;
  image_url: string;
  image_url_type: string;
  caption: string;
  timestamp: string;
  user: UserItem;
  comments: Array<CommentItem>;
};

export type UploadImageResponse = { filename: string };

export type CreatePostResponse = {
  id: number;
  image_url: string;
  image_url_type: string;
  caption: string;
  timestamp: string;
  user: {
    username: string;
  };
  comments: [
    {
      text: string;
      username: string;
      timestamp: string;
    }
  ];
};

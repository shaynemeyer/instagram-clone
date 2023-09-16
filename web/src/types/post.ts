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

export type CommentItem = {
  text: string;
  username: string;
  timestamp: string;
};

export type CommentRequest = {
  username: string;
  text: string;
  post_id: number;
};

export type CommentCreateResponse = {
  id: number;
  timestamp: string;
  text: string;
  username: string;
  post_id: number;
};

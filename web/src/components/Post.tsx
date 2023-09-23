import { useEffect, useState } from 'react';
import { PostItem } from '../types/post';
import { config } from '../libs/constants';
import { useDeletePost } from '../libs/hooks/post';
import { queryClient } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreateComment } from '../libs/hooks/comment';
interface PostProps {
  post: PostItem;
}

type User = {
  id: number;
  username: string;
} | null;

type CommentFormValues = {
  comment: string;
};

function Post({ post }: PostProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [user, setUser] = useState<User>(null);

  const postDelete = useDeletePost();
  const commentCreate = useCreateComment();

  const authContext = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<CommentFormValues>();

  useEffect(() => {
    if (post.image_url_type === 'absolute') {
      setImageUrl(post.image_url);
    } else {
      setImageUrl(`${config.BASE_URL}${post.image_url}`);
    }
  }, [post.image_url_type, post.image_url]);

  useEffect(() => {
    const userId = localStorage.getItem('user_id');
    const username = localStorage.getItem('username');

    if (userId && username) {
      setUser({ id: Number(userId), username } as User);
    }
  }, []);

  const handleDelete = () => {
    if (user && user.username === post.user.username) {
      console.log(`delete user clicked by ${user.username}`);
      postDelete.mutate(
        { id: Number(post.id) },
        {
          onSuccess: (data) => {
            window.scrollTo(0, 0);
            console.log({ data });
            setImageUrl('');
            queryClient.invalidateQueries(['posts']);
          },
          onError: (err) => {
            console.log({ err });
            // todo: handle error better.
          },
        }
      );
    }
  };

  const onSubmit: SubmitHandler<CommentFormValues> = (
    formData: CommentFormValues
  ) => {
    console.log({ formData });
    const userName = localStorage.getItem('username');

    if (userName) {
      commentCreate.mutate(
        {
          username: userName,
          text: formData.comment,
          post_id: post.id,
        },
        {
          onSuccess: (data) => {
            console.log({ data });
            queryClient.invalidateQueries(['posts']);
            reset();
          },
          onError: (err) => {
            console.log({ err });
          },
        }
      );
    }
  };

  return (
    <div className="flex flex-col w-2/3 mb-11 ml-auto mr-auto bg-white max-w-{500} border-2 border-gray-100 rounded-md">
      <div className="flex align-middle p-5">
        <img
          className="avatar-rd"
          alt="User Joe"
          src="https://randomuser.me/api/portraits/men/72.jpg"
        />
        <div className="flex flex-1 items-center justify-between ml-2">
          <h3>{post.user.username}</h3>
          {user && user.username === post.user.username && (
            <button className="btn-outlined" onClick={handleDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
      {imageUrl ? (
        <img
          className="w-full object-contain border-t-2 border-b-2 border-gray-50"
          src={imageUrl}
        />
      ) : null}
      <h4 className="font-normal p-5 border-b-2 border-gray-50">
        {post.caption}
      </h4>
      <div className="p-5">
        {post.comments.map((comment) => (
          <p key={comment.timestamp}>
            <strong>{comment.username}:</strong> {comment.text}
          </p>
        ))}
      </div>

      {authContext.isAuthenticated && (
        <form
          className="flex mt-3 ml-4 mr-4 mb-3 gap-2 border-t border-gray-100"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            className="p-2 mr-4 w-full"
            type="text"
            placeholder="Add a comment"
            {...register('comment', { required: true, maxLength: 100 })}
            aria-invalid={errors.comment ? 'true' : 'false'}
          />
          <button className="btn-link w-16" type="submit">
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;

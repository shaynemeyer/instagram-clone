import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useCreatePost, useUploadImage } from '../../libs/hooks/post';
import { UploadImageResponse } from '../../types/post';
import { queryClient } from '../../App';

type FormValues = {
  caption: string;
  image: FileList;
};

type ImageUploadProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

function ImageUpload({ isOpen, setIsOpen }: ImageUploadProps) {
  const [uploadError, setUploadError] = useState('');

  const uploadImage = useUploadImage();
  const post = useCreatePost();

  const createPost = ({
    filename,
    caption,
  }: {
    filename: string;
    caption: string;
  }) => {
    if (filename && caption) {
      setUploadError('');
      post.mutate(
        { caption, imageUrl: filename },
        {
          onSuccess: () => {
            setIsOpen(false);
            queryClient.invalidateQueries(['posts']);
            window.scrollTo(0, 0);
            reset();
          },
          onError: (err) => {
            console.log({ err });
            setUploadError('Could not upload image, please try again later.');
          },
        }
      );
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (formData: FormValues) => {
    setUploadError('');
    console.log({ formData });
    if (formData.image) {
      uploadImage.mutate(
        { image: formData.image[0] },
        {
          onSuccess: ({ filename }: UploadImageResponse) => {
            createPost({ filename, caption: formData.caption });
          },
          onError: (error) => {
            console.log({ error });
            setUploadError('Error uploading image');
          },
        }
      );
    }

    reset();
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false);
      }}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-4 gap-5 max-w-md">
              <h2 className="border-b-2 text-xl font-bold">Upload an image</h2>
              <input
                type="text"
                className="p-2"
                placeholder="Enter a caption"
                {...register('caption', { required: true, maxLength: 100 })}
                aria-invalid={errors.caption ? 'true' : 'false'}
              />
              <input
                type="file"
                id="fileInput"
                {...register('image', { required: true, maxLength: 100 })}
                aria-invalid={errors.image ? 'true' : 'false'}
              />

              {uploadError ? (
                <p role="alert" className="input-errors">
                  {uploadError}
                </p>
              ) : null}

              <button className="btn-default mb-4">Upload</button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default ImageUpload;

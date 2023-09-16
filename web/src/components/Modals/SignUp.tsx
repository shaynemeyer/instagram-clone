import { Dialog } from '@headlessui/react';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type FormValues = {
  username: string;
  email: string;
  password: string;
};

interface SignUpProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

function SignUp({ isOpen, setIsOpen }: SignUpProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) =>
    console.log(data);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        {/* The actual dialog panel  */}
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
            <center>
              <img
                className="object-contain w-50"
                src="images/ig-logo.png"
                alt="Instagram"
              />
            </center>
            <div className="flex flex-col px-6">
              <div className="mb-4">
                <input
                  className="p-2"
                  placeholder="username"
                  id="username"
                  type="text"
                  {...register('username', { required: true, maxLength: 20 })}
                  aria-invalid={errors.username ? 'true' : 'false'}
                />
                {errors.username?.type === 'required' && (
                  <p role="alert" className="input-errors">
                    Username is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className="p-2"
                  placeholder="email"
                  id="email"
                  type="text"
                  {...register('email', { required: true, maxLength: 20 })}
                  aria-invalid={errors.email ? 'true' : 'false'}
                />
                {errors.email?.type === 'required' && (
                  <p role="alert" className="input-errors">
                    Email is required
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  className="p-2"
                  placeholder="password"
                  id="password"
                  type="password"
                  {...register('password', { required: true, maxLength: 20 })}
                />
                {errors.password?.type === 'required' && (
                  <p role="alert" className="input-errors">
                    Password is required
                  </p>
                )}
              </div>

              <button type="submit" className="btn-default mb-4">
                Sign up
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SignUp;

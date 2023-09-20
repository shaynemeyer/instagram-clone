import { Dialog } from '@headlessui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

interface SignInProps {
  isOpen: boolean;
  setIsOpen: (value: React.SetStateAction<boolean>) => void;
}

type FormValues = {
  username: string;
  password: string;
};

function SignIn({ isOpen, setIsOpen }: SignInProps) {
  const authContext = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = (formData: FormValues) => {
    authContext.signIn({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        reset();
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
          <form className="flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
            <center>
              <img
                className="object-contain w-50"
                src="images/ig-logo.png"
                alt="Instagram"
              />
            </center>
            <div className="mb-2">
              <input
                className="p-2 mb-1"
                placeholder="username"
                type="text"
                {...register('username', { required: true, maxLength: 20 })}
                aria-invalid={errors.username ? 'true' : 'false'}
              />
              {errors.username?.type === 'required' && (
                <p role="alert" className="input-errors mb-2">
                  Username is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <input
                className="p-2 mb-1"
                placeholder="password"
                type="password"
                {...register('password', { required: true, maxLength: 20 })}
              />
              {errors.password?.type === 'required' && (
                <p role="alert" className="input-errors mb-2">
                  Password is required
                </p>
              )}
            </div>
            {authContext.authError ? (
              <div className="input-errors mb-2">{authContext.authError}</div>
            ) : undefined}
            <button className="btn-default" type="submit">
              Login
            </button>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}

export default SignIn;

import { useState } from 'react';

import { Dialog } from '@headlessui/react';

function Header() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      {/* Sign in dialog */}
      <Dialog
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <form className="flex flex-col p-4">
              <center>
                <img
                  className="object-contain w-50"
                  src="images/ig-logo.png"
                  alt="Instagram"
                />
              </center>
              <input
                className="mb-4 p-2"
                placeholder="username"
                type="text"
                // value={username}
                onChange={(e) => console.log(e.target.value)}
              />
              <input
                className="mb-4 p-2"
                placeholder="password"
                type="password"
                // value={password}
                onChange={(e) => console.log(e.target.value)}
              />
              <button
                className="btn-default"
                type="submit"
                onClick={() => setOpenSignIn(false)}
              >
                Login
              </button>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Sign up dialog */}
      <Dialog
        open={openSignUp}
        onClose={() => setOpenSignUp(false)}
        className="relative z-50"
      >
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
            <form className="flex flex-col">
              <center>
                <img
                  className="object-contain w-50"
                  src="images/ig-logo.png"
                  alt="Instagram"
                />
              </center>
              <div className="flex flex-col px-6">
                <input
                  className="mb-4 p-2"
                  placeholder="username"
                  type="text"
                  // value={username}
                  onChange={(e) => console.log(e.target.value)}
                />
                <input
                  className="mb-4 p-2"
                  placeholder="email"
                  type="text"
                  // value={email}
                  onChange={(e) => console.log(e.target.value)}
                />
                <input
                  className="mb-4 p-2"
                  placeholder="password"
                  type="password"
                  // value={password}
                  onChange={(e) => console.log(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={() => setOpenSignUp(false)}
                  className="btn-default mb-4"
                >
                  Sign up
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>

      <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-100 object-contain flex items-center justify-between p-1">
        <img
          className="object-contain w-48"
          src="images/ig-logo.png"
          alt="Instagram"
        />

        <div>
          <div className="mr-3">
            <button className="btn-link" onClick={() => setOpenSignIn(true)}>
              Login
            </button>
            <button className="btn-link" onClick={() => setOpenSignUp(true)}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

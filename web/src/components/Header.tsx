import { useState } from 'react';

import { Dialog } from '@headlessui/react';
import SignIn from './Modals/SignIn';
import SignUp from './Modals/SignUp';

function Header() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);

  return (
    <>
      <SignIn isOpen={openSignIn} setIsOpen={setOpenSignIn} />
      <SignUp isOpen={openSignUp} setIsOpen={setOpenSignUp} />

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
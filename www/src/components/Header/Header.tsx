'use client';
import Image from 'next/image';
import { useState } from 'react';

function Header() {
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-10 bg-white border-b-2 border-gray-100 object-contain flex items-center justify-between p-1">
        <Image
          src="/images/ig-logo.png"
          className="object-contain w-48"
          alt="Instagram"
          width={100}
          height={50}
          priority
        />
        <div>
          <div className="mr-3">
            {isAuthenticated ? (
              <button
                className="btn-link"
                onClick={() => setIsAuthenticated(false)}
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn-link"
                  onClick={() => setIsAuthenticated(true)}
                >
                  Login
                </button>
                <button
                  className="btn-link"
                  onClick={() => setOpenSignUp(true)}
                >
                  Signup
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;

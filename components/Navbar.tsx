'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import Image from 'next/image';

const data = [
  { id: 4, link: '/', title: 'Home' },
  { id: 2, link: '/about', title: 'About' },
  { id: 3, link: '/contact', title: 'Contact' },
];

interface User {
  email: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const syncUserFromStorage = () => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUserFromStorage(); // Initial check

    // Listen to the storage event
    window.addEventListener('storage', syncUserFromStorage);
    return () => {
      window.removeEventListener('storage', syncUserFromStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUser(null);

    // Trigger a localStorage event manually
    window.dispatchEvent(new Event('storage'));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen((prev) => !prev);
  };

  const newData = user
    ? [...data, { id: 6, link: '/admin', title: 'Dashboard' }]
    : [...data, { id: 7, link: '/login', title: 'Login' }];

  return (
    <nav className='bg-gray-800'>
      <div className='mx-auto max-w-6xl  px-4 '>
        <div className='relative flex h-16 items-center justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            {/* Mobile menu button */}
            <button
              type='button'
              className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset'
              onClick={toggleMobileMenu}
            >
              <Menu className='block w-6 h-6' />
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='hidden  sm:block'>
              <div className='flex space-x-4'>
                {newData.map((item) => (
                  <Link
                    key={item.id}
                    href={item.link}
                    className='rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {user ? (
            <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
              <div className='relative ml-3'>
                <div>
                  <button
                    type='button'
                    className='relative flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden'
                    onClick={toggleUserMenu}
                  >
                    <span className='absolute -inset-1.5'></span>
                    <span className='sr-only'>Open user menu</span>
                    <Image
                      className='w-8 h-8 rounded-full'
                      src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      alt='User Avatar'
                      width={32} // Width in pixels
                      height={32} // Height in pixels
                    />
                  </button>
                </div>

                {userMenuOpen && (
                  <div
                    className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 focus:outline-hidden'
                    role='menu'
                    aria-orientation='vertical'
                    aria-labelledby='user-menu-button'
                    tabIndex={-1}
                  >
                    <button
                      onClick={handleLogout}
                      className='block w-full px-4 py-2 text-sm text-gray-700'
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <Link href={'/contact'}>
              <Button>Contact Us</Button>
            </Link>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='sm:hidden' id='mobile-menu'>
          <div className='space-y-1 px-2 pt-2 pb-3'>
            {newData.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className='block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white'
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

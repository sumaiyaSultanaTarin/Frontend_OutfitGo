import { HomeIcon, CubeIcon, ChartBarIcon, ClipboardDocumentListIcon, UserIcon } from '@heroicons/react/24/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import React from 'react';

const Sidebar = () => {
  return (
    <aside className="h-screen w-64 bg-gray-800 text-white fixed flex flex-col">
      <div className="p-4 font-bold text-2xl">Outfit Go</div>
      <nav className="flex-1">
        <ul>
          <li className="p-3 flex items-center hover:bg-gray-700">
            <HomeIcon className="w-5 h-5 mr-2" />
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li className="p-3 flex items-center hover:bg-gray-700">
            <CubeIcon className="w-5 h-5 mr-2" />
            <Link href="/product">Products</Link>
          </li>
          <li className="p-3 flex items-center hover:bg-gray-700">
            <ChartBarIcon className="w-5 h-5 mr-2" />
            <Link href="/performance">Performance</Link>
          </li>
          <li className="p-3 flex items-center hover:bg-gray-700">
            <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
            <Link href="/orders">Orders</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};



const Navbar = () => {
  return (
    <header className="antialiased">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center">
          <div className="flex justify-start items-center">
            <button
              id="toggleSidebar"
              aria-expanded="true"
              aria-controls="sidebar"
              className="hidden p-2 mr-3 text-gray-600 rounded cursor-pointer lg:inline hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h14M1 6h14M1 11h7"
                />
              </svg>
            </button>
            <a href="/" className="flex mr-4">
              <img
                src="https://flowbite.s3.amazonaws.com/logo.svg"
                className="mr-3 h-8"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Outfit Go
              </span>
            </a>
            <form action="#" method="GET" className="hidden lg:block lg:pl-2">
              <label htmlFor="topbar-search" className="sr-only">
                Search
              </label>
              <div className="relative mt-1 lg:w-96">
                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  id="topbar-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-9 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Search"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center lg:order-2">
            <button type="button" className="flex mx-3 text-sm bg-gray-800 rounded-full">
              <span className="sr-only">User menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                alt="user profile"
              />
            </button>
            <div className="hidden z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown">
              <div className="py-3 px-4">
                <span className="block text-sm font-semibold text-gray-900 dark:text-white">Sumaiya</span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">sumaiya@gmail.com</span>
              </div>
              <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">My profile</a>
                </li>
                <li>
                  <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white">Account settings</a>
                </li>
              </ul>
              <ul className="py-1 text-gray-500 dark:text-gray-400" aria-labelledby="dropdown">
                <li>
                  <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};



export default Sidebar;
export { Navbar };

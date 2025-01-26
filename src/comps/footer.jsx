import React from 'react'
import Link from 'next/link';
import { Home } from 'lucide-react';
import Profile from './mobileFooter/profile'
import Menus from './mobileFooter/menu'
import Searched from './mobileFooter/search'

const Footer = () => {
  return (
    <>
      <footer className="mt-auto bg-base-200 w-full pb-12">
        <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            <div className="col-span-full lg:col-span-1">
              <Link
                className="flex-none text-xl font-semibold  focus:outline-none focus:opacity-80"
                href="/"
                aria-label="Brand"
              >
                <h1>Quilted Chronicles</h1>
              </Link>
            </div>

            <div className="col-span-1">
              <h2 className="font-semibold">About</h2>

              <div className="mt-3 grid space-y-3">
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/faq"
                  >
                    F.A.Q.
                  </Link>
                </p>
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/howitworks"
                  >
                    How It Works
                  </Link>
                </p>
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/search"
                  >
                    Search
                  </Link>
                </p>
                {/* <p>
                <a
                  className="inline-flex gap-x-2 text-primary hover:underline"
                  href="/about"
                >
                  About Us
                </a>
              </p> */}
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/contact"
                  >
                    Contact
                  </Link>
                </p>
              </div>
            </div>

            <div className="col-span-1">
              <h2 className="font-semibold">Account</h2>

              <div className="mt-3 grid space-y-3">
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/login"
                  >
                    Login
                  </Link>
                </p>
                <p>
                  <Link
                    className="inline-flex gap-x-2 text-primary hover:underline"
                    href="/register"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>

            {/* <div className="col-span-2">
            <h4 className="font-semibold text-gray-100">
              Get Updates on New Games:
            </h4>

            <form>
              <div className="mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 rounded-lg ">
                <div className="w-full">
                  <label htmlFor="email" className="sr-only">
                    Subscribe
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    className="input input-bordered block w-full rounded-lg text-sm"
                    placeholder="Enter your email"
                    autoComplete="true"
                  />
                </div>
                <a
                  className="w-full sm:w-auto hover:scale-110 whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent btn btn-primary  disabled:pointer-events-none"
                  href="#"
                >
                  Subscribe
                </a>
              </div>
            </form>
          </div> */}
          </div>

          <div className="mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center">
            <div className="flex justify-between items-center">
              <p className="text-sm ">© 2025 Quilted Chronicles.</p>
            </div>

            <div>
              <a href="mailto:contact@quiltedchronicles.com">
                contact@quiltedchronicles.com
              </a>
            </div>
          </div>
        </div>
      </footer>
      <footer className="block lg:hidden fixed bottom-0 left-0 right-0 bg-base-200 p-4">
        <div className="flex justify-around">
          <Link href="/" className=" hover:text-gray-400">
            <Home size={24} />
          </Link>
          <Searched />
          <Profile />
          <Menus />
        </div>
      </footer>
    </>
  );
}

export default Footer
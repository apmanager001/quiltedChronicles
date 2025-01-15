import React from 'react'

const Footer = () => {
  return (
    <footer className="mt-auto bg-base-200 w-full ">
      <div className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          <div className="col-span-full lg:col-span-1">
            <a
              className="flex-none text-xl font-semibold text-white focus:outline-none focus:opacity-80"
              href="#"
              aria-label="Brand"
            >
              Quilted Chronicles
            </a>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-100">About Us</h4>

            <div className="mt-3 grid space-y-3">
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/faq"
                >
                  F.A.Q.
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/howitworks"
                >
                  How It Works
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/search"
                >
                  Search
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/about"
                >
                  About Us
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/contact"
                >
                  Contact
                </a>
              </p>
            </div>
          </div>

          <div className="col-span-1">
            <h4 className="font-semibold text-gray-100">Account</h4>

            <div className="mt-3 grid space-y-3">
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/login"
                >
                  Login
                </a>
              </p>
              <p>
                <a
                  className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                  href="/register"
                >
                  Register
                </a>
              </p>
              {/* <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Blog</a></p>
            <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Careers</a> <span className="inline-block ms-1 text-xs bg-blue-700 text-white py-1 px-2 rounded-lg">We're hiring</span></p>
            <p><a className="inline-flex gap-x-2 text-gray-400 hover:text-gray-200 focus:outline-none focus:text-gray-200 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200" href="#">Customers</a></p> */}
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
            <p className="text-sm text-gray-400 dark:text-neutral-400">
              © 2025 Quilted Chronicles.
            </p>
          </div>

          <div>Socials</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
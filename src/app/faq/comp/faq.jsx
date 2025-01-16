import React from 'react'
import AccountPage from '../../account/layout'
import { CircleHelp } from 'lucide-react';

const FAQ = () => {
  return (
    <AccountPage>
      <div className="py-4 max-w-screen-sm mx-auto">
        <div className="text-center mb-16">
          <p className="mt-4 font-extrabold">F.A.Q</p>
          <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-primary">
            Frequently Asked <span className="text-accent">Questions</span>
          </h3>
        </div>

        <div className="px-2 sm:px-16">
          <div className="py-3 uppercase font-bold">Technical</div>

          <div className="ml-2">
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3  text-xl font-semibold">
                <CircleHelp size={60} fill="white" color="purple" />
              </div>
              <div className="text-md">
                <h1 className="text-primary font-semibold mb-2">
                  Can I mess up a story?
                </h1>
                <p className="text-sm">
                  Not at all. Our goal is to allow everyone be creative and your pivot to a story is one of many. Be as creative as you can.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3  text-xl font-semibold">
                <CircleHelp size={60} fill="white" color="purple" />
              </div>
              <div className="text-md">
                <h1 className="text-primary font-semibold mb-2">
                  How can I start a new story?
                </h1>
                <p className="text-sm">
                  Starting a new story is easy! Simply click the "Start a New
                  Story" button on the homepage, choose a title, and write the
                  first section. Once you're done, publish it, and others can
                  begin adding their sections.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3  text-xl font-semibold">
                <CircleHelp size={60} fill="white" color="purple" />
              </div>
              <div className="text-md">
                <h1 className="text-primary font-semibold mb-2">
                  Can I add my section to an existing story?
                </h1>
                <p className="text-sm">
                  Yes, definitely! Browse through the existing storylines and
                  click on any story that interests you. Click "Add Section" to
                  contribute your part to the narrative.
                </p>
              </div>
            </div>
          </div>

          {/* <div className="py-3 uppercase font-bold">Billings</div> */}

          <div className="ml-2">
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3  text-xl font-semibold">
                <CircleHelp size={60} fill="white" color="purple" />
              </div>
              <div className="text-md">
                <h1 className="text-primary font-semibold mb-2">
                  Are there any guidelines for writing sections?
                </h1>
                <p className="text-sm">
                  We encourage creativity and originality! However, please
                  adhere to our community guidelines which prohibit content that
                  is offensive, inappropriate, or violates copyright laws.
                </p>
              </div>
            </div>
            <div className="flex items-start my-8">
              <div className="hidden sm:flex items-center justify-center p-3 mr-3  text-xl font-semibold">
                <CircleHelp size={60} fill="white" color="purple" />
              </div>
              <div className="text-md">
                <h1 className="text-primary font-semibold mb-2">
                  Can I edit or delete my section after it's published?
                </h1>
                <p className="text-sm">
                  Once a section is published, it cannot be edited. This
                  maintains the integrity of collaborative storytelling.
                  However, if you need a section removed, please contact us.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AccountPage>
  );
}

export default FAQ
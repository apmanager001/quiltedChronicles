import React from 'react'
import Image from 'next/image';
import AccountPage from '../../account/layout';

const Works = () => {
  return (
    <AccountPage>
      <div className="flex flex-col justify-center my-10">
        <h1 className="text-center font-bold mb-4">How It Works</h1>
        <div className="bg-base-200 m-10 p-10 rounded-xl">
          <h2 className="font-bold my-2">How it works</h2>
          <span>
            Once on the chapter page, the current chapter will automatically
            display, allowing you to read through it. Below the chapter, you can
            select the next chapter to continue the story. The "Add a Chapter"
            button allows you to write and add your own chapter to the current
            one, enabling you to create your own story. The "View Story Chain"
            button lets you view all chapters from the beginning, so you can
            read the entire story.
          </span>
        </div>
        <div className="hidden lg:mockup-window bg-base-300 border mx-2 lg:mx-10 border-gray-700">
          <Image
            src="/howItWorks/desktop1.png"
            width={1500}
            height={1200}
            alt="example of a chapter and how to read"
            priority
            unoptimized
          />
        </div>
        <div className="flex flex-col gap-4 lg:hidden">
          <div className="mockup-phone ">
            <div className="camera"></div>
            <div className="display">
              <Image
                src="/howItWorks/mobile2.png"
                width={400}
                height={1000}
                alt="example of a chapter and how to read"
              />
            </div>
          </div>
          <div className="mockup-phone ">
            <div className="camera"></div>
            <div className="display">
              <Image
                src="/howItWorks/mobile3.png"
                width={400}
                height={1000}
                alt="example of a chapter and how to read"
              />
            </div>
          </div>
        </div>
      </div>
    </AccountPage>
  );
}

export default Works 
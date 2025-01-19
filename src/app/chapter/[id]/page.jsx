'use client'
import React from 'react'
import Chapter from '../comp/chapter'
// import { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "Invoices | Acme Dashboard",
// };

const Page = () => {
// console.log(updateMetadata)
  return (
    <>
      {/* <title>{updateMetadata.title}</title>
      <description>{description.slice(0, 150)}</description>
      <keywords>{keywords.join(", ")}</keywords> */}
      <div>
        <Chapter />
      </div>
    </>
  );
}

export default Page
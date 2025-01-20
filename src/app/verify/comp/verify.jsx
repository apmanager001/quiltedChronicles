'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../../../comps/utility/loading";
import Link from "next/link";
import { useParams } from "next/navigation";
// import { useRouter } from "next/navigation";
import useStore from '../../store/store'
import axiosInstance from '../../../comps/utility/axios'

const Verify = () => {
    const user = useStore((state) => state.user);
    const { id1, id2 } = useParams();

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!id1 || !id2) {
      window.location.href = "/settings";
    }
    try {
      axiosInstance.post(`/verify/${id1}/${id2}`);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [id1]);

  return (
    <div className="h-[800px] w-full flex justify-center items-center">
      {loading ? (
        <Loading />
      ) : (
        <div className="card bg-base-100 w-96 shadow-2xl border border-gray-700 p-2">
          <figure>
            <Image 
                src='/verified.svg'
                alt="Verified Image"
                height={500}
                width={500}
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Thank you for verifying your email!</h2>
            <p>
              Your email has now been verified and you can click the button
              below to go back to your settings page
            </p>
            <div className="card-actions justify-end">
              <Link href="/settings">
                <button className="btn btn-accent">Settings Page</button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Verify;

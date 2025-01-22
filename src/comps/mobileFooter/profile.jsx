'use client'
import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import useStore from '@/app/store/store'
import { CircleUser } from 'lucide-react'

const profile = () => {
    const [loading, setLoading] = useState(false)
    const user = useStore((state) => state.user);

    useEffect(()=> {
        if(user){
            setLoading(true)
        } 
    }, [user])

    return (
      <>
        {loading ? (
          <Link
            href={`/profile/${user.userName}`}
            className=" hover:text-gray-400"
          >
            <CircleUser size={24} />
          </Link>
        ) : (
          <Link
            href={`/login`}
            className=" hover:text-gray-400"
          >
            <CircleUser size={24} />
          </Link>
        )}
      </>
    );
}

export default profile
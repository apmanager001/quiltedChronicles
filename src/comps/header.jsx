import React from 'react'
import { BookOpenText} from 'lucide-react'
import UserInfo from './headerComp/userInfo'
import Link from 'next/link';

const Header = () => {
  return (
    <div className="navbar justify-between bg-base-200">
      <div className="flex flex-col mx-10">
        <div className="flex-1 flex justify-center items-center gap-4 text-xl">
          <BookOpenText size={28} />
          <Link href='/'>
          <span>Quilted Chronicles</span>
          </Link>
        </div>
      </div>
      <div></div>
      <div className=''>
        <UserInfo />
      </div>
    </div>
  );
}

export default Header
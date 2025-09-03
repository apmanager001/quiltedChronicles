import React from "react";
import Image from "next/image";
import UserInfo from "./headerComp/userInfo";
import Link from "next/link";

const Header = () => {
  return (
    <div className="navbar justify-between bg-base-200 shadow-sm border-b border-base-300">
      <div className="flex items-center">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="relative w-20 h-20 bg-base-content rounded-full flex items-center justify-center shadow-md border border-base-300">
            <div className="relative w-16 h-16 -mt-1">
              <Image
                src="/quiltedlogo.webp"
                alt="Quilted Chronicles Logo"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain"
                priority
              />
            </div>
          </div>
          <span className="text-xl font-semibold text-base-content hidden sm:block">
            Quilted Chronicles
          </span>
        </Link>
      </div>

      <div className="flex items-center">
        <UserInfo />
      </div>
    </div>
  );
};
export default Header;

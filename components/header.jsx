"use client";

import Link from "next/link";
import React from "react";

import MobileNav from "./mobileNav";
import DesktopNav from "./desktopNav";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className=" w-full flex flex-col items-center justify-between px-8 py-4 sm:px-12 md:px-16 lg:px-20">
      <div className="flex items-center justify-between w-full">
        <Link href={"/"}>
          <h1 className="text-2xl font-bold">
            <span className="text-primary">!</span>TrustMeBro
          </h1>
        </Link>

        {/* mobile nav */}
        <nav className="sm:hidden relative">
          <MobileNav />
        </nav>
        {/* desktop nav */}
        <nav className="hidden sm:flex">
          <DesktopNav />
        </nav>
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2 mt-2 sm:hidden ">
        <Input type="text" placeholder="Search" />
        <Button variant="secondary">Go</Button>
      </div>
    </header>
  );
};

export default Header;

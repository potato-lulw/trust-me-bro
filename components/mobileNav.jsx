import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Button } from './ui/button';
import { RiMenu4Line } from 'react-icons/ri';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import { useTheme } from 'next-themes';
import { FaPlus } from 'react-icons/fa';

const MobileNav = () => {
    const {theme, setTheme} = useTheme();
  return (
    <>
    <DropdownMenu>
          <DropdownMenuTrigger>
            <RiMenu4Line className='text-2xl'/>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Menu Content</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button size="icon" variant="ghost" className="w-full" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              <MdLightMode className="transition w-6 h-6 rotate-0 dark:rotate-90 dark:scale-0 "/>
              <MdNightlight className="transition absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100"/>
              <div className='sr-only'></div>
            </Button>
            <DropdownMenuSeparator />
            {/* <DropdownMenuItem>Search</DropdownMenuItem> */}
            <DropdownMenuItem>
              <Button className="w-full gap-2 flex">
                Add <FaPlus/>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default MobileNav
import React from "react";
import { Button } from "./ui/button";
import { MdLightMode, MdNightlight } from "react-icons/md";
import { useTheme } from "next-themes";
import { Input } from "./ui/input";
import Link from "next/link";
import AddButton from "./AddButton";

const DesktopNav = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-8">
      <Input type="text" placeholder="Search" />
        <Link href={"/add"}>
            <AddButton/>
        </Link>
      <Button
        size="icon"
        variant="ghost"
        className=""
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <MdLightMode className="transition w-6 h-6 rotate-0 dark:rotate-90 dark:scale-0 " />
        <MdNightlight className="transition absolute rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
        <div className="sr-only"></div>
      </Button>
    </div>
  );
};

export default DesktopNav;

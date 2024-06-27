import React from "react";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const AddButton = () => {
  return (
    <Button className="rounded-full flex gap-2">
      <Link href={"/add"} className="flex gap-2 items-center">
        Add <FaPlus />
      </Link>
    </Button>
  );
};

export default AddButton;

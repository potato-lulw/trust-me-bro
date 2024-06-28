import React from "react";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";

const AddButton = () => {
  return (
    
      <Button className="rounded-full flex gap-2">
        Add <FaPlus />
      </Button>
    
  );
};

export default AddButton;

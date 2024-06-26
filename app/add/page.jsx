"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePosted } from "@/components/datePosted";
import { FaMinus, FaPlus } from "react-icons/fa";
import Link from "next/link";

const AddSource = () => {
  const [links, setLinks] = useState([""]);
  const [date, setDate] = useState(null);

  const handleAddClick = () => {
    setLinks([...links, ""]);
  };

  const handleDeleteClick = () => {
    const newLinks = [...links];
    if (newLinks.length > 1) {
      newLinks.pop();
    }
    setLinks(newLinks);
  };

  const handleLinkChange = (index, event) => {
    const newLinks = [...links];
    newLinks[index] = event.target.value;
    setLinks(newLinks);
  };

  return (
    <div className="flex flex-1 justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>What happened in short</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input id="name" placeholder="Event" autoComplete="off"/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Date</Label>
                <DatePosted date={date} onDateChange={setDate} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Source</Label>
                {links.map((link, index) => (
                  <Input
                    key={index}
                    id={`link-${index}`}
                    placeholder="Links"
                    value={link}
                    onChange={(event) => handleLinkChange(index, event)}
                    className="mb-2"
                    autoComplete="off"
                  />
                ))}
              </div>
              <div className="flex justify-between">
                <Button variant="ghost" type="button" onClick={handleAddClick}>
                  <FaPlus />
                </Button>
                <Button variant="ghost" type="button" onClick={handleDeleteClick}>
                  <FaMinus />
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline"><Link href={"/"}>Cancel</Link></Button>
          <Button>Post</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddSource;

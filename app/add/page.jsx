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
import { useRouter } from "next/navigation";

const AddSource = () => {

  const router = useRouter();

  const [links, setLinks] = useState([""]);
  const [date, setDate] = useState(null);
  const [event, setEvent] = useState("");
  const [key, setKey] = useState("");
  const [error, setError] = useState("");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedLinks = links.join(", ");
    console.log("Event:", event);
    console.log("Date:", date);
    console.log("Links:", formattedLinks);
    console.log("Key:", key);
    console.log("actual key", process.env.NEXT_PUBLIC_POST_KEY);

    if (key === process.env.NEXT_PUBLIC_POST_KEY) {
      try {
        console.log("in");
        const response = await fetch("/api/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event: event,
            date: date ? date : new Date(),
            links: formattedLinks,
          }),
        });

        if (response.ok) {
          console.log("POST request successful");
          setError("");
          router.push("/");
          
        } else {
          console.log("POST request failed", await response.text());
          setError("Failed to send POST request");
        }
      } catch (e) {
        console.error("Error sending POST request:", e);
        setError("Failed to send POST request");
        return;
      }
    } else {
      setError("Invalid Key");
      return;
    }
  };

  return (
    <div className="flex gap-2 flex-1 flex-col justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create Post</CardTitle>
          <CardDescription>What happened in short</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Title</Label>
                <Input
                  id="name"
                  placeholder="Event"
                  autoComplete="off"
                  value={event}
                  required="required"
                  onChange={(e) => setEvent(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Date</Label>
                <DatePosted
                  date={date}
                  onDateChange={setDate}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Source</Label>
                {links.map((link, index) => (
                  <Input
                    key={index}
                    id={`link-${index}`}
                    placeholder="Links"
                    value={link}
                    required="required"
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
                <Button
                  variant="ghost"
                  type="button"
                  onClick={handleDeleteClick}
                >
                  <FaMinus />
                </Button>
              </div>
              <div className="flex gap-4 w-full">
                <Input
                  type="password"
                  placeholder="Enter the Key"
                  value={key}
                  required="required"
                  onChange={(e) => setKey(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex gap-4 w-full justify-between">
                <Button variant="outline">
                  <Link href="/">Cancel</Link>
                </Button>
                <Button type="submit">Post</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <h2 className="text-primary pt-2">Note: You cannot add without perms</h2>
    </div>
  );
};

export default AddSource;

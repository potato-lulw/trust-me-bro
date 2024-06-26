import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FaTrash } from "react-icons/fa";

const Post = ({ post, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [deleteInit, setDeleteInit] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")
  
  const dateObject = new Date(post.date);
  const month = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  if (isNaN(dateObject.getTime())) {
    return <p>Invalid date</p>;
  }

  const monthInd = dateObject.getMonth();
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const date = `${month[monthInd]} ${day}, ${year}`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const separatedLinks = post.links.split(",").map((link) => link.trim());

 

  const handlePostDelete = async () => {
    
    if(password === process.env.NEXT_PUBLIC_POST_KEY){

      const response = await fetch(`/api/posts/${post.id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        onDelete(post.id);
      } else {
        console.error("Failed to delete the post");
      }
      setError("");
    }
    else {
      setError("Invalid Password");
    }
  };

  return (
    <Card className="w-[350px] h-fit transition">
      <CardHeader className="pt-4 pb-2 flex justify-between items-center">
        <CardTitle className="text-base text-primary flex justify-between w-full items-center">
          {post.date && date}
          <FaTrash
            onClick={() => setDeleteInit(true)}
            className={`${deleteInit ? "hidden" : ""} cursor-pointer`}
          />
        </CardTitle>
      </CardHeader>
      <CardContent>
        {deleteInit && (
          <div className="flex justify-between items-center gap-2 my-2">
            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <FaTrash onClick={handlePostDelete} className="cursor-pointer" />
          </div>
        )}
        {error && (<div>{error}</div>)}
        <form>
          <div className="grid w-full items-center gap-2">
            <div className="flex flex-col space-y-1.5">
              <p className="font-bold lg:text-3xl text-2xl">{post.event}</p>
            </div>
          </div>
        </form>
        {isExpanded && (
          <div className="mt-4 flex flex-col gap-2 text-gray-600">
            <Label htmlFor="links" className="text-secondary-foreground">
              Links
            </Label>
            {separatedLinks.map((link) => {
              const formattedLink =
                link.startsWith("http://") || link.startsWith("https://")
                  ? link
                  : `http://${link}`;
              return (
                <a
                  className="font-medium border-b border-border w-fit"
                  href={formattedLink}
                  target="_blank"
                  rel="noreferrer"
                  key={link}
                >
                  {link}
                </a>
              );
            })}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="secondary" className="w-full" onClick={toggleExpand}>
          {isExpanded ? "Collapse" : "Source"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Post;

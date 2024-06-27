import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "./ui/label";
import { Input } from "./ui/input";

const Post = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const dateObject = new Date(post.date);
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  // Check if the dateObject is valid
  if (isNaN(dateObject.getTime())) {
    return <p>Invalid date</p>;
  }

  const monthInd = dateObject.getMonth();
  const day = dateObject.getDate();
  const year = dateObject.getFullYear();
  const date = `${month[monthInd-1]} ${day}, ${year}`;

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const seperatedLinks = (post.links).split(",");

  return (
    <Card className="w-[350px] h-fit">
      <CardHeader>
        <CardTitle className="text-base text-primary">{post.date && date}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-2">
            <div className="flex flex-col space-y-1.5">
              <p className="font-bold lg:text-3xl text-2xl">{(post.event)}</p>
            </div>
          </div>
        </form>
        {isExpanded && (
          <div className="mt-4 flex flex-col gap-2 text-gray-600">
            <Label htmlFor="links" className="text-secondary-foreground">Links</Label>
            {
                seperatedLinks.map(link => (
                    <a className="font-medium border-b border-border w-fit" href={link} target="_blank" rel="noreferrer" key={link}>
                        {link.trim()}
                    </a>
                ))
            }
            
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

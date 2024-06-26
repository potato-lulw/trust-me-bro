import PostFeed from "@/components/PostFeed";
import Header from "../components/header";


export default function Home() {
  return (
    <main className="flex flex-col  items-center  justify-between ">
       <PostFeed/>
    </main>
  );
}

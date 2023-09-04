import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import pb from "@/lib/pocketbase";

export default function MainMenu() {
  return (
    <div className="flex justify-center items-center">
      <Link href={"/create"} className="-rotate-12 mt-16">
        <Card className="bg-yellow-500 border-0 h-[25rem] w-[15rem]">
          <CardContent className="flex justify-center items-center h-full">
            <p className="text-4xl">create</p>
          </CardContent>
        </Card>
      </Link>
      <Link href={"/plans"} className="z-[1]">
        <Card className="bg-blue-500 border-0 h-[25rem] w-[15rem]">
          <CardContent className="flex justify-center items-center h-full">
            <p className="text-4xl">plans</p>
          </CardContent>
        </Card>
      </Link>
      <Link href={"/history"} className="rotate-12 mt-16">
        <Card className="bg-green-500 border-0 h-[25rem] w-[15rem]">
          <CardContent className="flex justify-center items-center h-full">
            <p className="text-4xl">history</p>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

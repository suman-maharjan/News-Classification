"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const PublicNavbar = () => {
  const router = useRouter();
  return (
    <nav className="w-full p-4 border-b-2">
      <div className="container mx-auto text-center flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          News
        </h1>

        <div className="flex gap-4">
          <Button
            size={"lg"}
            onClick={() => {
              console.log("handle register");
            }}
          >
            Register
          </Button>
          <Button
            size={"lg"}
            onClick={() => {
              console.log("handle register");
            }}
            variant={"outline"}
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;

"use client"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation"
import { OurFileRouter } from "../api/uploadthing/core";
import { UploadButton } from "@uploadthing/react";

function TopNav() {
    const router = useRouter();

    return (
      <nav className="flex w-full item-center justify-between p-4 text-xl font-semibold border-b">
        <div> Gallery </div>
        <div className="flex flex-row">
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>
            <SignedIn>
                {/* <UploadButton endpoint="imageUploader" onClientUploadComplete={(res) => {
                    // never gets here
                    console.log("Files: ", res);
                    alert("Upload Completed");
                    console.log("Upload Complete.")
                    router.refresh();
                  }}
                  onUploadError={(error: Error) => {
                    console.log(error)
                  }}></UploadButton> */}
                  <UploadButton<OurFileRouter, "imageUploader">
                  endpoint="imageUploader"></UploadButton>
                <UserButton></UserButton>
            </SignedIn>
        </div>
      </nav>
    )
}

export default TopNav
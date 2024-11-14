"use client"

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";


function TopNav() {

    const router = useRouter();

    return (
      <nav className="flex w-full item-center justify-between p-4 text-xl font-semibold border-b">
        <div> Gallery </div>
        <div>
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-rol align-center justfify-center">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    router.refresh();
                  }}
                  onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                  }}
                />
                <UserButton></UserButton>
              </div>
            </SignedIn>
        </div>
      </nav>
    )
}

export default TopNav
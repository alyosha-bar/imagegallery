import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";
import { SimpleUploadButton } from "./simple-upload-button";


function TopNav() {
    return (
      <nav className="flex w-full items-center justify-between p-4 text-xl font-semibold border-b h-24">
        <Link href="/" className="text-3xl p-4"> Gallery </Link>
        <div>
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-rol items-center justfify-center gap-6">
                {/* <UploadButton
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
                /> */}
                <SimpleUploadButton />
                <UserButton></UserButton>
              </div>
            </SignedIn>
        </div>
      </nav>
    )
}

export default TopNav
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"


function TopNav() {
    return (
      <nav className="flex w-full item-center justify-between p-4 text-xl font-semibold border-b">
        <div> Gallery </div>
        <div>
            <SignedOut>
                <SignInButton></SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton></UserButton>
            </SignedIn>
        </div>
      </nav>
    )
}

export default TopNav
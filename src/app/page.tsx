import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";


export const dynamic = "force-dynamic";

async function Images() {

  const images = await getMyImages()

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {images.map( (image) => (
        <div key={image.id}>
          <Image
            src={image.url}
            alt="image"
            className="w-48 flex flex-col"
            width={480}
            height={480}
            style={{objectFit: "contain"}}
          />
          <p> {image.name} </p>
        </div>
      ))}
    </div>
  )
}


// server components --> server side rendering
export default async function HomePage() {

  return (
    <main className="">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please Sign In Above.
        </div>
      </SignedOut>
      <SignedIn>
        <Images></Images>
      </SignedIn>
    </main>
  );
}

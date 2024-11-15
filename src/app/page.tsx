import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { getMyImages } from "~/server/queries";


export const dynamic = "force-dynamic";

async function Images() {

  const images = await getMyImages()

  return (
    <div className="flex flex-wrap gap-4 py-3">
      {images.map((image) => (
        <div
          key={image.id}
          className="flex h-80 w-64 flex-col border border-gray-300 rounded-lg shadow-md p-4"
        >
          <Link
            href={`/img/${image.id}`}
            className="flex flex-col justify-between h-full"
          >
            {/* Image and Name */}
            <div className="flex flex-col items-center">
              <div className="p-2 font-semibold">{image.name}</div>
              <div className="flex-grow w-full h-48 flex items-center justify-center bg-gray-50 rounded">
                <Image
                  src={image.url}
                  alt="image"
                  className="w-full h-full object-contain"
                  width={480}
                  height={480}
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>

            {/* Date */}
            <p className="mt-4 text-center text-sm font-medium">
              Uploaded on: {image.createdAt.toLocaleDateString()}
            </p>
          </Link>
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

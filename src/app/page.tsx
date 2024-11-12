import Link from "next/link";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";


// server components --> server side rendering
export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy:(model, {desc} ) => desc(model.id)
  })

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {images.map( (image) => (
          <div key={image.id}>
            <img src={image.url} className="w-48 flex flex-col" />
            <p> {image.name} </p>
          </div>
        ))}
      </div>
    </main>
  );
}

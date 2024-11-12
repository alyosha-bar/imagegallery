import Link from "next/link";
import { db } from "~/server/db";


const mockUrls = [
  "https://utfs.io/f/d78E0xR5jA0BLtV8v54ynKJ5zDag8HfEkmrBptSjMWwuh0Ol",
  "https://utfs.io/f/d78E0xR5jA0BX4i5EW1zFMJwAch3LlnBf0TVQ8CgSd1iyxoY",
  "https://utfs.io/f/d78E0xR5jA0BpBSf8blBi6oCeg05w1nZKEdfWsyIUzTrAxaD",
  "https://utfs.io/f/d78E0xR5jA0B1axaJlkiSVDrRv5HO1ah0zCJTfuUl7dgIbGE",
  "https://utfs.io/f/d78E0xR5jA0BxPvQ9bWfGu2bpsh5NFQRPHlC6IU8nBc93VEy"
]

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url: url
}));


// server components --> server side rendering
export default async function HomePage() {

  const posts = await db.query.posts.findMany()

  console.log(posts)

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map( (post) => (
          <div key={post.id}>
            <p> {post.name} </p>
          </div>
        ))}
        {mockImages.map((image) => (
          <div key={image.id} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}

import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { ratelimit } from "~/server/ratelimit";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 40 } })
    .middleware(async ({ req }) => {
      // auth
      const user = await getAuth(req)
      if (!user) throw new UploadThingError("Unauthorized");

      // control who can and cannot upload
      const clerk = await clerkClient()
      const fullUserData =  await clerk.users.getUser(user.userId as string)

      if (fullUserData?.privateMetadata?.["cant-upload"] == true) {
        throw new UploadThingError("User not authorized to upload")
      }


      // rate limiting
      const { success } = await ratelimit.limit(user.userId as string)
      if (!success) throw new UploadThingError("Ratelimited.")

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url: ", file.url);

      // save to DB
      console.log("Saving to DB")
      await db.insert(images).values({
        name: file.name,
        url: file.url,
        userId: metadata.userId as string
      })

      console.log("Inserted Successfully.")


      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

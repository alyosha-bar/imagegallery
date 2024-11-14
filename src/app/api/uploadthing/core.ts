import { auth, getAuth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ req }) => {
      console.log("Middleware reached");
      const user = await getAuth(req);

      if (!user) {
        console.error("Unauthorized access");
        throw new UploadThingError("Unauthorized");
      }

      console.log("Authorized user:", user.userId);

      return { userId: user.userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("onUploadComplete reached");
      console.log("Metadata:", metadata);
      console.log("File URL:", file.url);

      return { uploadedBy: metadata.userId, fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
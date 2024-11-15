import { clerkClient } from "@clerk/nextjs/server";
import { getImage } from "~/server/queries";

export default async function FullPageImageView( props: {id: number}) {

    const image = await getImage(props.id)
    const clerk = await clerkClient()
    const uploadedInfo = await clerk.users.getUser(image.userId)

    console.log(uploadedInfo)

    return (
        <div className="flex h-full w-screen min-w-0 items-center justify-center text-white">
            <div className="flex-shrink flex-grow">
                <div className="w-full h-screen flex justify-center items-center">
                    <img src={image.url} className="h-4/5 object-contain fill border border-white" alt={image.name} />
                </div>
            </div>


            <div className="flex h-full w-72 flex-shrink-0 flex-col border-l">
                <div className="border-b p-4 text-center text-xl">{image.name}</div>
        
                <div className="p-4 border-b">
                    <div>Uploaded By:</div>
                    <div>{uploadedInfo.fullName}</div>
                </div>
        
                <div className="p-4 border-b">
                    <div>Uploaded On:</div>
                    <div>{image.createdAt.toLocaleDateString()}</div>
                </div>
    
                <div className="p-2">
                    {/* <form
                        action={async () => {
                            "use server";
            
                            await deleteImage(idAsNumber);
                        }}
                        >
                        <Button type="submit" variant="destructive">
                            Delete
                        </Button>
                    </form> */}
                </div>
            </div>
        </div>
    );
}
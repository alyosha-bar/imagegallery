import { getImage } from "~/server/queries";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoPage({
    params,
}: {
    params: { id: string };
}) {
    const { id: photoId } = await params; // Await params here if it's asynchronous

    const idAsNum = Number(photoId)

    if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id.")

    return (
        <FullPageImageView id={idAsNum}></FullPageImageView>
    );
}

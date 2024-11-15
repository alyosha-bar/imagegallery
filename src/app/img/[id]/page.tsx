import { getImage } from "~/server/queries";

export default async function PhotoModal({
    params,
}: {
    params: { id: string };
}) {
    const { id: photoId } = await params; // Await params here if it's asynchronous

    const idAsNum = Number(photoId)

    if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id.")

    const image = await getImage(idAsNum)
    return <div> <img src={image.url} alt="" className="w-96" /></div>;
}

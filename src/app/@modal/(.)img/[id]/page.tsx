import { getImage } from "~/server/queries";
import { Modal } from "./modal";
import FullPageImageView from "~/components/full-image-page";

export default async function PhotoModal({
    params,
}: {
    params: { id: string };
}) {
    const { id: photoId } = await params; // Await params here if it's asynchronous

    const idAsNum = Number(photoId)

    if (Number.isNaN(idAsNum)) throw new Error("Invalid photo id.")

    return (
        <Modal>
            <FullPageImageView id={idAsNum}></FullPageImageView>
        </Modal>
    );
}

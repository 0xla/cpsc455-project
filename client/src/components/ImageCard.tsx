import { ImageData } from "../types";

export default function ImageCard({ imageData }: { imageData: ImageData }) {

    return (
        <div className="card w-auto bg-base-100 shadow-xl">
            <figure><img src={imageData.url} alt={imageData.id} /></figure>
            <div className="card-body">
                <p>{imageData.description}</p>
            </div>
        </div>
    );
}
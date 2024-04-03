import { Link } from "react-router-dom";


const Photo = ({photo}) => {
    return (
        <div className="mb-5">
            {photo.image && (
                <img src={`http://localhost:5000/uploads/photos/${ photo.image }`} alt={photo.title} className="w-full mb-5" />
            )}
            <h1 className="text-xl font-semibold">{ photo.title }</h1>
            <p>Publicado por: <Link to={`/profile/show/${photo.userId}`}>{photo.userName}</Link></p>
        </div>
    )
}

export default Photo;
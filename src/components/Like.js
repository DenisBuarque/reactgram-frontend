import { BsHeart, BsHeartFill } from "react-icons/bs";

const Like = ({photo, user, handleLike}) => {
    return (
        <div className="flex items-center">
            {photo.likes && user && (
                <>
                    {photo.likes.includes(user._id) ? (
                        <BsHeartFill />
                    ) : (
                        <BsHeart onClick={() => handleLike(photo)} className="cursor-pointer" />
                    )}
                    <p className="ml-2">{photo.likes.length} like(s)</p>
                </> 
            )}
        </div>
    )
}

export default Like;
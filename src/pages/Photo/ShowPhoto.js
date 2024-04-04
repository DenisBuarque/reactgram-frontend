import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../components/Message";
import Photo from "../../components/Photo";
import Like from "../../components/Like";

import {
  getPhoto,
  userLike,
  resetMessage,
  commentUser,
} from "../../slices/photoSlice";

const ShowPhoto = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const [commentText, setCommentText] = useState("");

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const handleLike = () => {
    dispatch(userLike(photo._id));
  };

  const handleComment = (e) => {
    e.preventDefault();

    const commentData = {
      comment: commentText,
      id: photo._id,
    };

    dispatch(commentUser(commentData));

    setCommentText("");

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  useEffect(() => {
    dispatch(getPhoto(id));
  }, [id, dispatch]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-semibold">Foto</h1>
      <p className="mb-4">Detalhe da publicação.</p>

      <Photo photo={photo} />
      <Like photo={photo} user={user} handleLike={handleLike} />
      <h2>{photo.comments && photo.comments.length} Comentário(s).</h2>
      <div className="my-5">
        <form onSubmit={handleComment}>
          <div className="flex">
            <input
              type="text"
              name="comment"
              className="border p-3 rounded w-full mr-1"
              placeholder="Digite um comentário"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />

            <button
              type="submit"
              className="bg-gray-300 text-center p-3 block rounded"
            >
              Enviar
            </button>
          </div>
        </form>

        {message && <Message msg={message} type="bg-green-300" />}
        {error && <Message msg={message} type="bg-red-300" />}
      </div>

      {photo.comments && (
        <>
          {photo.comments.length === 0 && <p>Não há comentários no momento.</p>}
          {photo.comments &&
            photo.comments.map((comment, index) => (
              <div key={index} className="mb-3">
                <div className="flex items-center">
                  {comment.userImage && (
                    <img
                      src={`http://localhost:5000/uploads/users/${comment.userImage}`}
                      alt={comment.userName} 
                      className="w-8 h-8 rounded-full mr-2"
                    />
                  )}
                  <Link to={`/profile/show/${comment.userId}`}>
                    {comment.userName}
                  </Link>
                </div>
                <p className="text-gray-500">{comment.comment}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default ShowPhoto;

import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Message from "../../components/Message";
import Photo from "../../components/Photo";
import Like from "../../components/Like";

import { getPhoto, userLike } from "../../slices/photoSlice";

const ShowPhoto = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photo, loading, error, message } = useSelector(
    (state) => state.photo
  );

  const handleLike = () => {
    dispatch(userLike(photo._id));
  }

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

    </div>
  );
};

export default ShowPhoto;

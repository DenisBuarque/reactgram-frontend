import { useEffect } from "react";
import { Link } from "react-router-dom";
// components
import Like from "../../components/Like";
import Message from "../../components/Message";
import Photo from "../../components/Photo";
//redux
import { useSelector, useDispatch } from "react-redux";
import { getAllPhotos, userLike, resetMessage } from "../../slices/photoSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getAllPhotos());
  }, [dispatch]);

  const handleLike = (photo) => {
    dispatch(userLike(photo._id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-semibold">Home</h1>
      <p className="mb-4">Seja bem-vindo ao React Gran</p>

      { photos && photos.map((photo) => (
        <div key={photo._id} className="mb-10">
            <Photo photo={photo} />
            <Like photo={photo} user={user} handleLike={handleLike} />
            <br/>
            <Link to={`/photo/show/${photo._id}`} className="bg-blue-700 text-white text-center p-3 rounded">Ver detalhes</Link>
        </div>
      ))}
      {photos && photos.length === 0 && (
        <p>Ainda não há fotos publicadas <Link to={`/profile/show/${user._id}`}>clique aqui</Link></p>
      )}
    </div>
  );
};

export default Home;

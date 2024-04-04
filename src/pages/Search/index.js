import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
//components
import Like from "../../components/Like";
import Photo from "../../components/Photo";
// redux
import { useSelector, useDispatch } from "react-redux";
import { searchPhotos, userLike, resetMessage } from "../../slices/photoSlice";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { photos, loading } = useSelector((state) => state.photo);

  useEffect(
    () => {
      dispatch(searchPhotos(search));
    },
    [dispatch,
    search]
  );

  const handleLike = (photo) => {
    dispatch(userLike(photo._id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  if (loading) {
    return <p>Aguarde...</p>;
  }

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-semibold">Busca</h1>
      <p className="mb-4">Você esta buscando por: <strong>{search}</strong></p>

      {photos &&
        photos.map((photo) => (
          <div key={photo._id} className="mb-10">
            <Photo photo={photo} />
            <Like photo={photo} user={user} handleLike={handleLike} />
            <br />
            <Link
              to={`/photo/show/${photo._id}`}
              className="bg-blue-700 text-white text-center p-3 rounded"
            >
              Ver detalhes
            </Link>
          </div>
        ))}
      {photos && photos.length === 0 && (
        <p>Não foi encontrado fotos para sua busca.</p>
      )}
    </div>
  );
};

export default Search;

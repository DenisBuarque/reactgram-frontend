import { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { BsFillEyeFill, BsPencilFill, BsXLg } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";

//redux
import { getUserDetail } from "../../slices/userSlice";
import {
  publishPhoto,
  resetMessage,
  getUserPhotos,
  deletePhoto, 
  updatePhoto
} from "../../slices/photoSlice";

const ShowProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const [editId, setEditId] = useState();
  const [editTitle, setEditTitle] = useState();
  const [editImage, setEditImage] = useState();

  const { user, loading } = useSelector((state) => state.user);
  const { user: userAuth } = useSelector((state) => state.auth);

  const newPhotoRef = useRef();
  const editPhotoRef = useRef();

  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo);

  useEffect(() => {
    dispatch(getUserDetail(id));
    dispatch(getUserPhotos(id));
  }, [dispatch, id]);

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData();

    if (file) {
      formData.append("image", file);
    }

    if (title) {
      formData.append("title", title);
    }

    await dispatch(publishPhoto(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  }

  const handleDelete = (id) => {
    dispatch(deletePhoto(id));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  const handleEdit = (photo) => {
    newPhotoRef.current.classList.add("hidden");
    editPhotoRef.current.classList.remove("hidden");

    setEditId(photo._id);
    setEditImage(photo.image);
    setEditTitle(photo.title);
  };

  const handleCancel = () => {
    newPhotoRef.current.classList.remove("hidden");
    editPhotoRef.current.classList.add("hidden");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    const photoData = {
      id: editId,
      title: editTitle,
    }

    dispatch(updatePhoto(photoData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 3000);
  };

  // create image preview
  const imageMimeType = /image\/(png|jpg|jpeg)/i;

  const handleChangeImage = (e) => {
    const file = e.target.files[0];

    if (!file.type.match(imageMimeType)) {
      alert("Adicione somente imagens no formato PNG, JPG, JPEG");
      return false;
    }

    setFile(file);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-semibold">Fotos</h1>
      <p className="mb-4">Galeria de imagens publicadas.</p>
      <div className="w-36 mr-3">
        {user.profileImage ? (
          <img
            src={`http://localhost:5000/uploads/users/${user.profileImage}`}
            alt={user.name}
            className="w-36 h-36 rounded-full block"
          />
        ) : (
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-default-avatar-profile-icon-grey-photo-placeholder-99724602.jpg"
            alt="Profile"
            className="w-36 h-36 rounded-full"
          />
        )}
      </div>
      <div className="mb-5">
        <h1 className="text-xl font-bold">{user.name}</h1>
        <p className="mb-6">{user.email}</p>
        <p>{user.bio}</p>
      </div>

      <h1 className="text-xl font-semibold mb-5">
        Compartilhe um momento seu:
      </h1>

      {id === userAuth._id && (
        <>
          <div ref={newPhotoRef} className="">
            <form onSubmit={handleSubmit} className="flex flex-col">
              <div>
                <label htmlFor="title" className="block font-semibold">
                  Título:
                </label>
                <input
                  type="text"
                  name="title"
                  className="border mb-2 p-3 rounded w-full"
                  placeholder="Digite um título para a foto"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="image" className="block font-semibold">
                  Imagem:
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChangeImage}
                  accept=".png, .jpg, .jpeg"
                  className="border rounded p-2 w-full mb-2"
                />
              </div>

              {!loadingPhoto && (
                <button
                  type="submit"
                  className="bg-slate-700 text-white text-center p-3 block rounded"
                >
                  Postar Foto
                </button>
              )}

              {loadingPhoto && (
                <button
                  type="button"
                  className="bg-gray-300 text-center p-3 block rounded"
                >
                  Aguarde...
                </button>
              )}
            </form>

            {messagePhoto && <Message msg={messagePhoto} type="bg-green-200" />}
            {errorPhoto && <Message msg={errorPhoto} type="bg-red-300" />}
          </div>

          <div ref={editPhotoRef} className="hidden">
            {editImage && (
              <img
                src={`http://localhost:5000/uploads/photos/${editImage}`}
                alt={editTitle}
                className="w-full mb-3"
              />
            )}

            <form onSubmit={handleUpdate} className="flex flex-col mb-2">
              <div>
                <label htmlFor="title" className="block font-semibold">
                  Título:
                </label>
                <input
                  type="text"
                  name="title"
                  className="border mb-2 p-3 rounded w-full"
                  placeholder="Digite um título para a foto"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </div>

              {!loadingPhoto && (
                <button
                  type="submit"
                  className="bg-slate-700 text-white text-center p-3 block rounded"
                >
                  Atualizar Foto
                </button>
              )}

              {loadingPhoto && (
                <button
                  type="button"
                  className="bg-gray-300 text-center p-3 block rounded"
                >
                  Aguarde...
                </button>
              )}
            </form>
            {messagePhoto && <Message msg={messagePhoto} type="bg-green-200" />}
            {errorPhoto && <Message msg={errorPhoto} type="bg-red-300" />}
            <button
              type="button"
              onClick={() => handleCancel()}
              className="bg-gray-300 text-center p-3 rounded w-full"
            >
              Cancelar
            </button>
          </div>
        </>
      )}

      <div className="mt-10">
        <h1 className="text-2xl font-semibold">Fotos Publicadas</h1>
        <p className=" mb-10">Veja as fotos publicadas pelo usuário</p>
        <div className="grid grid-cols-2 gap-2">
          {photos &&
            photos.map((photo) => (
              <div key={photo._id} className="mb-10">
                {photo.image && (
                  <img
                    src={`http://localhost:5000/uploads/photos/${photo.image}`}
                    alt={photo.title}
                    className="w-full mb-3"
                    title={photo.title}
                  />
                )}
                {id === userAuth._id ? (
                  <div className="flex justify-around">
                    <Link to={`/photo/show/${photo._id}`}>
                      <BsFillEyeFill />
                    </Link>
                    <BsPencilFill
                      onClick={() => handleEdit(photo)}
                      className="cursor-pointer"
                    />
                    <BsXLg
                      onClick={() => handleDelete(photo._id)}
                      className="cursor-pointer"
                      title="Clique para excluir a foto"
                    />
                  </div>
                ) : (
                  <Link to="/">Ver detalhes</Link>
                )}
              </div>
            ))}
        </div>
        {photos.length === 0 && <p>Ainda não há fotos publicadas.</p>}
      </div>
    </div>
  );
};

export default ShowProfile;

import { useState, useEffect } from "react";
//redux
import { useDispatch, useSelector } from "react-redux";
import { profile, resetMessage, updateProfile } from "../../slices/userSlice";

import Message from "../../components/Message";

const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");
  const [bio, setBio] = useState(user.bio || "");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(user.profileImage || "");

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    if(file){
      formData.append("profileImage", file);
    }

    if(name){
      formData.append("name", name);
    }

    if(bio){
      formData.append("bio", bio);
    }

    if(password){
      formData.append("password", password);
    }

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    },3000);
  }

  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

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

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <div className="max-w-xl m-auto">
      <h1 className="text-2xl font-semibold">Perfil</h1>
      <p className="mb-4">Atualize seus dados de usuário.</p>

      <form onSubmit={handleSubmit} className="flex flex-col mb-8">
        <div>
          {profileImage || fileDataURL ? (
            <img
              src={
                fileDataURL
                  ? fileDataURL
                  : `http://localhost:5000/uploads/users/${profileImage}`
              }
              alt={name}
              className="w-36 h-36 rounded-full"
            />
          ) : (
            <img
              src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-grey-photo-placeholder-illustrations-vectors-default-avatar-profile-icon-grey-photo-placeholder-99724602.jpg"
              alt="Profile"
              className="w-36 h-36 rounded-full"
            />
          )}
        </div>
        <div>
          <label htmlFor="image" className="font-semibold">Imagem do perfil:</label>
          <input
            type="file"
            name="image"
            onChange={handleChangeImage}
            accept=".png, .jpg, .jpeg"
            className="border rounded p-2 w-full mb-2"
          />
        </div>
        <div>
          <label htmlFor="name" className="block font-semibold">
            Nome:
          </label>
          <input
            type="text"
            name="name"
            className="border mb-2 p-3 rounded w-full"
            placeholder="Digite seu nome"
            value={name || ""}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="block font-semibold">
            E-mail:
          </label>
          <input
            type="email"
            name="email"
            className="border mb-2 p-3 rounded w-full"
            placeholder="Digite seu e-mail"
            value={email || ""}
            onChange={(e) => setEmail(e.target.value)}
            disabled
          />
        </div>
        <div>
          <label htmlFor="bio" className="block font-semibold">
            Bio:
          </label>
          <textarea
            name="bio"
            className="border mb-1 p-3 rounded w-full"
            value={bio || ""}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Digite a bioagrafia do usuário"
          ></textarea>
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold">
            Deseja alterar sua senha?
          </label>
          <input
            type="password"
            name="password"
            className="border mb-2 p-3 rounded w-full"
            placeholder="Digite sua senha"
            value={password || ""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {!loading && (
          <button
            type="submit"
            className="bg-gray-300 text-center p-3 block rounded"
          >
            Atualizar Dados
          </button>
        )}

        {loading && (
          <button
            type="button"
            className="bg-gray-300 text-center p-3 block rounded"
          >
            Aguarde...
          </button>
        )}

        {message && <Message msg={message} type="bg-green-200" />}

        {error && <Message msg={message} type="bg-red-300" />}
      </form>
    </div>
  );
};

export default EditProfile;

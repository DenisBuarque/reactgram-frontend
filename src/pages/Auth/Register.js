import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { reset, register } from "../../slices/authSlice";

import Message from "../../components/Message";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const user = {
    name,
    email,
    password,
    confirmPassword,
  };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(user));

  }

  //clean nup all
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="max-w-md m-auto">
      <h1 className="text-2xl font-semibold">Cadastre-se</h1>
      <p className="mb-4">
        Crie uma nova conta para ver as fotos de seus amigos.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col mb-8">
        <input
          type="text"
          name="name"
          className="border mb-2 p-3 rounded"
          placeholder="Digite seu nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          className="border mb-2 p-3 rounded"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="border mb-2 p-3 rounded"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          name="confirmpassword"
          className="border mb-2 p-3 rounded"
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {!loading && (
          <button
            type="submit"
            className="bg-gray-300 text-center p-3 block rounded"
          >
            Cadastrar Dados
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

        {error && <Message msg={error} type="bg-red-300" />}
      </form>
      <p>
        Não tem uma conta?
        <Link to="/login" className="font-semibold">
          Clique aqui
        </Link>
      </p>
    </div>
  );
};

export default Register;

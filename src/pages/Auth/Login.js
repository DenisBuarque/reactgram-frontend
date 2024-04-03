import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../../slices/authSlice";

import Message from "../../components/Message";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const user = {
    email,
    password,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };

  //clean nup
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <div className="max-w-md m-auto">
      <h1 className="text-2xl font-semibold">Login</h1>
      <p className="mb-4">Entre com seus dados.</p>

      <form onSubmit={handleSubmit} className="flex flex-col mb-8">
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
        Já tem conta?
        <Link to="/register" className="font-semibold">
          Clique aqui
        </Link>
      </p>
    </div>
  );
};

export default Login;

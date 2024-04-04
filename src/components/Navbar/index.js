import { Link } from "react-router-dom";
import {
  BsSearch,
  BsHouseDoorFill,
  BsPersonFill,
  BsFillCameraFill,
} from "react-icons/bs";

//hooks
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//redux
import { logout, reset } from "../../slices/authSlice";

const Navbar = () => {
  const [query, setQuery] = useState("");

  const { auth } = useAuth();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <nav className="flex justify-between items-center bg-slate-300 p-3">
      <Link to="/" className="text-2xl font-semibold">
        ReactGram
      </Link>
      <form
        onSubmit={handleSearch}
        className="flex gap-1 items-center relative"
      >
        <BsSearch className="absolute left-1" />
        <input
          type="search"
          name="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="O quê procura?"
          className="pl-7 p-1 rounded"
        />
      </form>
      <ul className="flex gap-4 items-center">
        {auth ? (
          <>
            <li>
              <Link to="/">
                <BsHouseDoorFill className="w-6 h-6" />
              </Link>
            </li>
            {user && (
              <li>
                <Link to={`/profile/show/${user._id}`}>
                  <BsFillCameraFill className="w-6 h-6" />
                </Link>
              </li>
            )}
            <li>
              <Link to={`/profile`}>
                <BsPersonFill className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link to="/" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Cadastre-se</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import EditProfile from "./pages/Profile/EditProfile";
import ShowProfile from "./pages/Profile/ShowProfile";
import ShowPhoto from "./pages/Photo/ShowPhoto";
import Search from "./pages/Search";
// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//hooks
import { useAuth } from "./hooks/useAuth";

function App() {

  const {auth, loading } = useAuth();

  if(loading) {
    return <p>Carregando página...</p>;
  }

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <main className="container m-auto my-9">
          <Routes>
            <Route path="/" element={auth ? <Home /> : <Navigate to="/login" /> } />
            <Route path="/profile" element={auth ? <EditProfile /> : <Navigate to="/login" />} />
            <Route path="/profile/show/:id" element={auth ? <ShowProfile /> : <Navigate to="/login" />} />
            <Route path="/photo/show/:id" element={auth ? <ShowPhoto /> : <Navigate to="/login" />} />
            <Route path="/search" element={auth ? <Search /> : <Navigate to="/login" />} />
            <Route path="/login" element={!auth ? <Login /> : <Navigate to="/" />} />
            <Route path="/register" element={!auth ? <Register /> : <Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

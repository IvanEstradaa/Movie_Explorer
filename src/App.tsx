import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search"
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import MovieDetails from "./pages/MovieDetails";
import "./App.css";
import Favorites from "./pages/Favorites";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
      <div>
          <NavBar/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/search" element={<Search/>}/>
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
              <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
              <Route path="/movie/:id" element={<MovieDetails/>}/>
              <Route path="/favorites" element={<Favorites/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
          </Routes>
      </div>
  );
}
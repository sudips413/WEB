import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import allActions from "./actions";
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Settings from "./components/Settings/Settings";
import Create from "./components/Edit/Create";
import Footer from "./components/Footer/Footer";
import SinglePost from "./components/SinglePost/SinglePost";


function App() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  async function fetchFromId() {
    if (id) {
      const res = await axios.get(`https://blog-1pne.onrender.com/api/user/${id}`);
      const user = res.data.users;
      const obj = {
        username: user.name,
        email: user.email,
        id: user._id,
        image: user.image,
      };
      dispatch(allActions.userActions.set_user(obj));
    }
    
    const res = await axios.get("https://blog-1pne.onrender.com/api/posts");
    const posts = res.data;
    dispatch(allActions.setAllPosts.set_posts(posts));
  }

  useEffect(() => {
    fetchFromId();
  }, []);

  

  return (
    <>
      <div className="page-container">
        <Router>
          <div className="content-wrap">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/setting" element={<Settings />} />
              <Route path="/create" element={<Create />} />
              <Route path ="/singlepost/:id" element={<SinglePost/>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;

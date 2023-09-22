// main app
import React, { useEffect } from "react";
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
import axios from "axios";
import GoogleTagManager from "./components/googleAnalytics/GoogleTagManager";


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
        other: res.data.others,
        followings: user.followings,
        followers: user.followers,
      };
      dispatch(allActions.userActions.set_user(obj));
      
    }
    dispatch(allActions.userActions.set_loading_status(true));
    const res = await axios.get("https://blog-1pne.onrender.com/api/posts");
    const posts = res.data;
    dispatch(allActions.setAllPosts.set_posts(posts));
    

    
  }

  useEffect(() => {
    dispatch(allActions.userActions.set_loading_status(true));     
    fetchFromId();
  }, []); 

  return (
    <>
      <GoogleTagManager />
      <div className="page-container">
        <Router>
          <div className="content-wrap">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              {
                id ? (
                  null
                ):
                (<>
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
                )
              }
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              
              <Route path="/setting" element={<Settings />} />
              <Route path="/create" element={<Create />} />
              <Route path ="/singlepost/:id" element={<SinglePost/>} />
              <Route path="*" element={<h1>404 Not Found</h1>} />
            </Routes>
          </div>
          <Footer />
          {
            // check if the accept-cookies exists in the local storage or not
            localStorage.getItem("accept-cookies") !== null ? null : (
          
          <div className="accept-cookies col-lg">
            <div className="cookie-container" style={{
                backgroundColor:"#F7D49A ",
                display:"flex",
                justifyContent:"space-between",
                alignItems:"center",
                padding:"0 10px",
                position:"fixed",
                bottom:"50px",
                // width:"40%",
                border:"1px solid #ccc",
                borderRadius:"10px",

            }}> <p>
                    We use cookies in this website to give you the best experience on our site and show you relevant ads. To find out more, read our
                    <a href="#" className="cookie-link"> privacy policy</a> and <a href="#" className="cookie-link">cookie policy</a>.
                </p>
                <button className="btn btn-success cookie-accept" onClick={()=>{
                    window.localStorage.setItem("accept-cookies","true");
                    document.querySelector(".accept-cookies").style.display="none";
                }}>Accept</button>
                <button className="btn btn-danger cookie-decline" 
                onClick={()=>{
                    window.localStorage.setItem("accept-cookies","false");
                    document.querySelector(".accept-cookies").style.display="none";
                }}>Decline</button> 
            </div>
          </div>
            )
              }
        </Router>
      </div>
    </>
  );
}

export default App;

import React,{useEffect} from "react";
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


function App() {
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  console.log(id)
  async function fetchFromId(){
    if(id){
    await axios.get(`https://server-7n65.onrender.com/api/user/${id}`)
        .then(res=>{
          let obj = {
            username:res.data.users.name,
            email:res.data.users.email,
            id:res.data.users._id,
            image:res.data.users.image,
          }
            dispatch(allActions.userActions.set_user(obj));
        }       
        )
      }
    await axios.get("https://server-7n65.onrender.com/api/posts")   
      .then(res=>{
        dispatch(allActions.setAllPosts.set_posts(res.data));
      }
      )
  }
     useEffect(()=>{
        
        fetchFromId();
  
    },[])  
  return (
   <>
   <div className="page-container">
   
   <Router>
   <div className="content-wrap">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/setting" element={<Settings/>}/>
        <Route path="/create" element={<Create/>}/>
        <Route path="*" element={<h1>404 Not Found</h1>}/>
      </Routes>
    </div>  
    <Footer/>

      

   </Router>
  </div> 
   



   
   </>
  );
}

export default App;



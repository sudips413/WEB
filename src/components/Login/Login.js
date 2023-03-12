import React,{useEffect, useState} from 'react'
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import allActions from '../../actions';
import './login.css'
export default function Login() {
    
    const [email,setemail] = React.useState("");
    const [password,setpassword] = React.useState("");
    const [error,seterror] = useState(true);
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    


    
  return (
    <>
    
    <div className='container'>
      <div className='row rows'>
         
        {/* <div className="logo text-center col-12">
          <img src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png" style={{width:"30%"}} alt="logo" />
        </div> */}
      
      
      
        <form className="form col-12" onSubmit={async (e)=>{
          e.preventDefault();
          if(email && password){
            await axios.post("https://server-7n65.onrender.com/api/login",{
              email:email,
              password:password

            })
            .then((res)=>{
              if(res.data.success){
                const obj ={
                  username:res.data.user.name,
                  email:res.data.user.email,
                  id:res.data.user._id,
                  image:res.data.user.image,
                  loginStatus:true,
                  // set id in local storage                 

                }
                localStorage.setItem("id",res.data.user._id);
                dispatch(allActions.userActions.set_user(obj));
                dispatch(allActions.setAllPosts.set_posts(res.data.posts));
                window.location.href="/";
                
              }
              else{

                document.getElementById("error").innerHTML = "User Doesnt Exist";
                setTimeout(()=>{
                  seterror(false);
                },1000);
                
              }
            }
            )
            .catch((err)=>{
              document.getElementById("error").innerHTML =  "Credentials are wrong";
              setTimeout(()=>{
                seterror(false);
              },1000);
              seterror(true);


            })
        }
        else
        {
          document.getElementById("error").innerHTML = "Please fill all the fields correctly";
          setTimeout(()=>{
            seterror(false);
          },500);
          seterror(true);
        }
            
        }}>
          <h2>SIGN IN</h2>

          <input type='text' className='form-control'  id="mail" placeholder="Email"
          onChange={(e)=>{
              var status = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value);
              if(status){
                setemail((e.target.value).toLowerCase());
                document.getElementById("mail").style.border="2px solid green"
              }else{
                document.getElementById("mail").style.border="2px solid red"
              }
            }
          } required/>
          
          <input type='password' className='form-control'  id="password" placeholder="Password"
          onChange={(e)=>{
            var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
            if(status){
                setpassword(e.target.value)
                document.getElementById("password").style.border="2px solid green"
            }else{
                document.getElementById("password").style.border="2px solid red"
            }

        }}
           required/>
          <label className='label' style={{color:"red"}}>forgot password?</label>
          <br/>
          <button type='submit' className='btn btn-primary'>Login</button>
          {error && <p id="error"></p>}
          <div className='text'>
          <label className='label'>No account?</label>
          <br/>
          <button className='btn btn-dark'>Signup</button>
        </div>  
        </form>
        
      </div>  
      
       

    </div>
    
    </>

  )
}

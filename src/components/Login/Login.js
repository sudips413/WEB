import React,{useEffect, useState} from 'react'
import { useDispatch,useSelector} from 'react-redux';
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
    const regStatus = useSelector(state=>state.registrationStatusReducer.registrationStatus);
    


    
  return (
    <>
    
    <div className='container'>
      <div className='row rows'> 
      {regStatus && <div className="alert alert-success" role="alert"><i className='fa fa-check'> </i> Registration Success, Please Login</div>}
        <form className="form col-12" onSubmit={async (e)=>{
          e.preventDefault();
          
          if(email && password){
            document.getElementById("logIn").style.display="block";
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
                dispatch(allActions.userActions.set_registration_status(false));
                dispatch(allActions.userActions.set_user(obj));
                dispatch(allActions.setAllPosts.set_posts(res.data.posts));                
                window.location.href="/";
                document.getElementById("logIn").style.display="none";
                
              }
              else{

                document.getElementById("error").innerHTML = "User Doesnt Exist";
                setTimeout(()=>{
                  seterror(false);
                },1000);
                document.getElementById("logIn").style.display="none";
                
              }
            }
            )
            .catch((err)=>{
              document.getElementById("logIn").style.display="none";
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
          <span id="logIn" style={{color:"green",display:"none"}}>Loggin in ...</span>
          {error && <p id="error"></p>}
         
        </form>
        <div className='text' >
          <label className='label'>No account?</label>
          <br/>
          <button className='btn btn-dark' onClick={()=>{navigate('/register')}}>Signup</button>
        </div>  
        
      </div>  
      
       

    </div>
    
    </>

  )
}

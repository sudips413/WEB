import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDispatch} from 'react-redux';
import allActions from '../../actions';


function Register() {
    const[username,setusername]= useState("");
    const[mail,setmail]=useState("");
    const[password, setpassword]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    
    <div className='container'>
        <div className='row rows'>
        {/* <div className="logo text-center">
            <img src="https://cdn.pixabay.com/photo/2012/05/07/18/57/blog-49006_960_720.png" alt="logo" style={{width:"40%"}} />
        </div> */}
        
      
        <form className="form col-12" onSubmit={async (e)=>{
            e.preventDefault();
            if(mail && password && username){
                document.getElementById("RegisterIN").style.display="block";
                await axios.post("https://server-7n65.onrender.com/api/register",{
                    name: username,
                    email: mail,
                    password: password

            
                })
                .then((res)=>{
                    document.getElementById("error").innerHTML = res.data.message;
                    navigate('/login')
                    document.getElementById("RegisterIN").style.display="none";
                    dispatch(allActions.userActions.set_registration_status(true));
                })
                .catch((err)=>{
                    document.getElementById("error").innerHTML = err.response.data.message;
                    document.getElementById("RegisterIN").style.display="none";
                }
                )

            }
            else
            {
                document.getElementById("error").innerHTML = "Password requires both upper and lower case letters, numbers or invalid email";
            }
        }}>
            <h2>SIGN UP</h2>
           
            <input type='text' id="text" className='form-control' placeholder='Username'  onChange={(e)=>{
                var status= /^[a-zA-Z0-9]+.{3,15}$/.test(e.target.value);
                if(status){
                    setusername(e.target.value);
                    document.getElementById("text").style.border="2px solid green"
                }
                else{
                    document.getElementById("text").style.border="2px solid red"
                }

            }} required/>
            
            
            <input type='text' className='form-control' id="mail" placeholder='Email' onChange={(e)=>{
              var status = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(e.target.value);
              if(status){
                setmail((e.target.value).toLowerCase());
                document.getElementById("mail").style.border="2px solid green"
              }else{
                document.getElementById("mail").style.border="2px solid red"
              }
            }
          }  required/>
            
            <input type='password' className='form-control' id='password' placeholder='Password'
            onChange={(e)=>{
            var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
            if(status){
                setpassword(e.target.value)
                document.getElementById("password").style.border="2px solid green"
            }else{
                document.getElementById("password").style.border="2px solid red"
            }

            }} required/>
            <br/>
            <button type='submit' className='btn btn-primary'>Signup</button>
            <span id="RegisterIN" style={{color:"green",display:"none"}}> REGISTERING ...</span>
            <p id="error"></p>
            <label className='label'>Already have an account?</label>
            
            <button className='btn btn-danger' onClick={(e)=>{
                e.preventDefault();
                navigate('/login')
                
            }}>login</button>

        </form>       
        
        
        </div>  
    </div>

  )
}

export default Register
import React, { useEffect,useState } from 'react'
import logo from '../../components/image/me.jpg'
import './settings.css'
import axios from 'axios';
import {useSelector} from 'react-redux';

export default function Settings() {
    
    const[oldpassword,setoldpassword]=useState("");
    const[newpassword,setnewpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const [wait,setwait]=useState(true);
  
    const id = window.localStorage.getItem("id");
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const posts = useSelector(state => state.postReducer.posts)
    let img = currentUser.image;
    if(img){
    img = img.replace("public/", "");
    }
    
  
    

    const [image,setimage]=useState([])
    function changepassword(e){
        e.preventDefault();
        const id = window.localStorage.getItem("id");
        if(newpassword===confirmpassword){
            axios.put(`https://server-7n65.onrender.com/api/changepassword/${id}`,
            {
                oldpassword:oldpassword,
                newpassword:newpassword
                }
                )
            .then(res=>{
                document.getElementById("err").innerHTML=res.data.message;
                setTimeout(()=>{
                    setwait(false);
                    },1000);
                    document.getElementById("form").reset();
            })
            .catch(err=>{
                alert("You entered different password");
            })


        }else{
            alert("Password not match");
        }



    }
    function countPosts(){
        let count = 0;
        for(let i=0;i<posts.length;i++){
            if(posts[i].userid === currentUser.id){
                count++;
            }
        }
        return count;
    }
    
       
    
  return (
    <>
    <div className='container mt-5'>
        
        <div className='row'>
            <div className="col-lg-4 col-md-4 col-xs-12">
                <div className="card card-profile">
                    <div className="card-header text-center">
                        <h3>Profile</h3>
                        <input type="file" name="file" id="file" className="inputfile" accept='.jpg,.png' style={{display:"none"}} onChange={(e)=>{
                            setimage(e.target.files[0])
                        }}/>
                        {currentUser.image ?
                        <label for="file" id="file" ><img src={`https://server-7n65.onrender.com/${img}`} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>:
                        (<label for="file" id="file" ><img src={logo} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>)
                        }
                        <br/>
                        <span style={{fontSize:"18px",fontWeight:"600"}}>{currentUser.username}</span>
                        <br/>
                        <button className="btn btn-info mt-3" onClick={
                            (e)=>{
                                e.preventDefault();
                                if(image.length !== 0){
                                    const data = new FormData();
                                    data.append("file",image);
                                    const id = window.localStorage.getItem("id");
                                    axios.put(`https://server-7n65.onrender.com/api/profile/${id}`,data)
                                    .then(res=>{
                                        window.location.reload();
                                        document.getElementById("error").innerHTML = "Profile Picture Updated";
                                        setTimeout(()=>{document.getElementById("error").innerHTML = "";},2000)
                                    }
                                    )
                                    .catch(err=>{
                                        document.getElementById("error").innerHTML = "profile picture not updated";
                                    }
                                    )
                                }
                                else{
                                    document.getElementById("error").innerHTML = "Please Select an Image 📷";
                                    setTimeout(()=>{
                                        document.getElementById("error").innerHTML = "";
                                    }
                                    ,2000)

                                }
                        }}>Upload</button> 
                        <div className='row' style={{display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Followers</label>
                                <h5>0</h5>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Following</label>
                                <h5>0</h5>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Posts</label>
                                <h5> {countPosts()}</h5>
                            </div>
                        </div>
                        
                    </div>                    
                    <p id ="error" style={{color:"red"}}></p>
                    <div className="card" style={{border:"none"}}>
                    <button className="btn btn-view-details btn-info" data-toggle="collapse" data-target="#details" onClick={()=>{
                            if(document.querySelector(".details").style.display === "none"){
                                document.querySelector(".details").style.display = "block";
                            }
                            else{
                                document.querySelector(".details").style.display = "none";
                            }
                        }}>View Details</button>
                    <div className="card-header text-center" style={{backgroundColor:"white"}}>
                       
                        <div className="details text-center">
                            <label> 🤷 User Details</label>
                            <div>
                            <span>Username: {currentUser.username}   </span> <br/>
                            <span>Email: {currentUser.email}</span>
                            </div>
                            
                        </div>
                    </div>  
                </div>     

                </div>
                   
                    
            </div>            
            <div className="col-lg-8 col-md-8 col-xs-12">
                <div className="row">
                    <div className="card col-lg-12 col-md-12 col-xs-12"> 
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >Follow People</label> 
                    <span> You dont have Followers.</span>
                    <button className='btn btn-info' style={{width:"150px"}}>Follow People</button>
                    <br/>
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >My Posts</label>
                    {countPosts()>=1 ?( 
                    posts.map((post,index)=>{
                        let img = post.image.replace("public/", "");
                        if(post.userid===id){
                                                                                  
                               return(                
                                <div className="card-header" key={index}>                                
                                    <div className="card-list">
                                        <div className="card-item">
                                            <div className="card-image">
                                                <img src={`https://server-7n65.onrender.com/${img}`} alt="logo" style={{height:"50px",width:"10%",borderRadius:"5px"}} />
                                                <span style={{fontFamily:"monospace",color:"purple",fontSize:"16px"}}>{post.title}</span>
                                            </div>
                                        </div>        
                                    </div> 
                                
                                </div> 
                            )
                               }    
                        })
                    ):(<span> You have no posts yet.</span>)
                              
                    } 
                    </div>    


                    <div className="card col-lg-12 col-md-12 col-xs-12">
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}}>Change Password</label>
                        <div className="card-header">
                            
                            <br/>
                            <form onSubmit={changepassword} id="form">
                                <label> Current Password *</label>
                                <input type="password"  className="form-control passwordlabel" id="old" placeholder="Enter Old Password"  onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setoldpassword(e.target.value);
                                        document.getElementById("old").style.border="2px solid green"
                                    }else{
                                        document.getElementById("old").style.border="2px solid red"
                                    }

                                }} required/>
                                <label> New Passord *</label>
                                <input type="password"  className="form-control passwordlabel" id="new" placeholder="Enter New Password"  onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setnewpassword(e.target.value)
                                        document.getElementById("new").style.border="2px solid green"
                                    }else{
                                        document.getElementById("new").style.border="2px solid red"
                                    }

                                }}required />
                                <label> New Password confirm * </label>
                                <input type="password"  className="form-control passwordlabel" id="confirm" placeholder="Confirm New Password"  
                                onChange={(e)=>{
                                    var status = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/.test(e.target.value)
                                    if(status){
                                        setconfirmpassword(e.target.value)
                                        document.getElementById("confirm").style.border="2px solid green"
                                    }else{
                                        document.getElementById("confirm").style.border="2px solid red"
                                    }

                                }}required />
                                <button type='submit' className="btn btn-primary mt-2 mb-2 col-xs-8" style={{width:"40%"}}>Change Password</button>
                            </form> 
                            {wait && <p id="err" style={{color:"red"}}></p>}   
                        </div>
                    </div>
                </div>    
            </div>               


        </div>          

        
    </div>
    </>

  )
}

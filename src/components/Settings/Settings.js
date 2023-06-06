import React, { useEffect,useState } from 'react'
import logo from '../../components/image/me.jpg'
import './settings.css'
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import Cardheader from './Cardheader';
import { useNavigate } from 'react-router-dom';
import allActions from '../../actions';


export default function Settings() {
    
    const[oldpassword,setoldpassword]=useState("");
    const[newpassword,setnewpassword]=useState("");
    const[confirmpassword,setconfirmpassword]=useState("");
    const [wait,setwait]=useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    //to view details of user
    const [isDisplaying, setIsDisplaying] = useState(false);
    function handleDisplayClick() {
        setIsDisplaying(!isDisplaying);
    }
    
  
    const id = window.localStorage.getItem("id");
    const currentUser = useSelector(state => state.userReducer.currentUser);
    const posts = useSelector(state => state.postReducer.posts)
    //fetch all the users
    
    const [image,setimage]=useState([])
    function changepassword(e){
        e.preventDefault();
        
        const id = window.localStorage.getItem("id");
        if(newpassword===confirmpassword){
            // https://blog-1pne.onrender.com
            axios.put(`https://blog-1pne.onrender.com/api/changepassword/${id}`,
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
    

    const allUser = currentUser.other;


 
  return (
    <>
    
    <div className='container mt-5 '>
        <div className='row'>
            <div className="col-lg-3 col-md-3 col-sm-8 col-xs-12">
                <div className="card card-profile">
                    <div className="card-header text-center">

                        <input type="file" name="file" id="file" className="inputfile" accept='.jpg,.png' style={{display:"none"}} onChange={(e)=>{
                            setimage(e.target.files[0])
                        }}/>
                        {currentUser.image!==""?
                        <label htmlFor="file" id="file" ><img src={currentUser.image} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>:
                        (<label htmlFor="file" id="file" ><img src={logo} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>)
                        }
                        
                        <br/>
                        <span style={{fontSize:"18px",fontWeight:"600"}}>{currentUser.username}</span>
                        <br/>
                        <button className="btn btn-info mt-3" onClick={
                            (e)=>{
                                e.preventDefault();
                                
                                if(image.length !== 0){
                                    document.getElementById("profile-upload").disabled=true;
                                    document.getElementById("profile-upload").cursor = "not-allowed";
                                    const data = new FormData();
                                    data.append("file",image);
                                    const id = window.localStorage.getItem("id");
                                    axios.put(`https://blog-1pne.onrender.com/api/profile/${id}`,data)
                                    .then(res=>{
                                        dispatch(allActions.userActions.set_image(res.data.userdata.image));
                                        document.getElementById("error").innerHTML = "Profile Picture Updated";
                                        setTimeout(()=>{document.getElementById("error").innerHTML = "";},2000)
                                        document.getElementById("profile-upload").disabled=false;
                                        document.getElementById("profile-upload").cursor = "allowed";
                                    }
                                    )
                                    .catch(err=>{
                                        document.getElementById("error").innerHTML = "profile picture not updated";
                                        document.getElementById("profile-upload").disabled=false;
                                        document.getElementById("profile-upload").cursor = "allowed";
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
                        }} id="profile-upload">Upload</button> 
                        <div className='row' style={{display:"flex",justifyContent:"space-around",marginTop:"20px"}}>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Followers</label>
                                <h5>{currentUser.followers.length}</h5>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Following</label>
                                <h5>{currentUser.followings.length}</h5>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4'>
                                <label>Posts</label>
                                <h5> {countPosts()}</h5>
                            </div>
                        </div>
                        
                    </div>                    
                    <p id ="error" style={{color:"red"}}></p>
                    <div className="card mb-2" style={{border:"none"}}>
                    <button className="btn btn-view-details" data-toggle="collapse" data-target="#details" onClick={()=>{
                        handleDisplayClick();

                            
                        }}> View Details {isDisplaying? <i class="fa fa-arrow-up"></i>: <i class="fa fa-arrow-down"></i>}</button>
                    {isDisplaying &&
                    <div className="card-header text-center mb-4" style={{backgroundColor:"white"}}>                       
                        <div className="details text-center">
                            <label> 🤷 User Details</label>
                            <div>
                            <span>Username: {currentUser.username}   </span> <br/>
                            <span>Email: {currentUser.email}</span>
                            </div>
                        </div>
                    </div> 
                    } 
                </div>     

                </div>
                   
                    
            </div>            
            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-10">
                <div className="row card-content-password">
                    <div className="card col-lg-12 col-md-12 col-xs-12 card-content"> 
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >My Posts</label>
                    {countPosts()>=1 ?( 
                    posts.map((post,index)=>{
                        if(post.userid===id){
                                                                                  
                               return(                
                                <div className="card-header" key={index}>                                
                                    <div className="card-list text-center">
                                        <div className="card-item single-card-link" >
                                            <div className="card-image card-post-info" >
                                                <img src={post.image} alt="logo" style={{height:"120px",width:"150px",borderRadius:"5px",padding:"10px"}} />
                                                <span style={{fontFamily:"monospace",color:"white",fontSize:"16px"}}>{post.title}</span>
                                                <button className='view-btn' 
                                                onClick={(e)=>{
                                                    e.preventDefault();
                                                    localStorage.setItem("postId",post._id);
                                                    // window.location.href = "/singlepost/"+post._id;
                                                    navigate(`/singlepost/${post._id}`);
                                                        
                                                        
                                                    }}>view <i className='fa fa-eye'></i></button>
                                            </div>
                                        </div>        
                                    </div> 
                                
                                </div> 
                            )
                               }    
                        })
                    ):(<span> You have no posts yet.</span>)
                              
                    } 
                    <br/>
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >My Followers</label> 
                    <div className='followers'>                    {
                        currentUser.followers.length>=1 ?(
                            currentUser.followers.map((user,index)=>{
                                // check if user id exists in the allUser array
                                function followerFinder(){
                                    for(let i=0;i<allUser.length;i++){
                                        if(allUser[i]._id === user){
                                            return allUser[i];
                                        }
                                    }
                                }  
                                return(
                                     <div className="card-header" key={index}>
                                        <img src={followerFinder().image} alt="logo" style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                                        <span>{followerFinder().name}</span>

                                    </div>
                                
                                )
                            })
                        ):(
                            <span> You dont have Followers.</span>
                        )
                    }  
                    </div>       
                    <br/>          
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >Following</label> 
                    <div className='following'>
                    {
                        currentUser.followings.length>=1 ?(

                            currentUser.followings.map((user,index)=>{
                                // check if user id exists in the allUser array
                                function FollowingFinder(){
                                    for(let i=0;i<allUser.length;i++){
                                        if(allUser[i]._id === user){
                                            return allUser[i];
                                        }
                                    }
                                }
                                 
                                return(
                                     <div className="card-header" key={index}>
                                        <img src={FollowingFinder().image} alt="logo" style={{height:"50px",width:"50px",borderRadius:"50%"}} />
                                        <span>{FollowingFinder().name}</span>

                                    </div>
                                )
                            })
                        ):(
                            <span> You dont have follwings.</span>
                        )
                    }
                    </div>
                    <br/>
                    
                    </div>    


                    <div className="card col-lg-12 col-md-12 col-xs-12 card-password">
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
                                <button type='submit' className="btn btn-primary mt-1 mb-2 col-xs-8" style={{width:"40%"}}>Change Password</button>
                            </form> 
                            {wait && <p id="err" style={{color:"red"}}></p>}   
                        </div>
                    </div>
                    <div className="card col-lg-12 col-md-12 col-xs-12 card-delete-account">
                        <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}}>Delete Account</label>
                        <div className="card-header">
                            Deleting your account will permanently remove all of your data from our servers. This includes all of your posts, comments, messages, and followers. This action cannot be undone.                            <br/>
                            <button className="btn btn-danger mt-1 mb-2 col-xs-8" style={{width:"60%"}}>Delete Account</button>
                        </div>
                    </div>
                </div>    
            </div>  
            <div className="col-lg-3 col-md-3 col-sm-8 col-xs-12">
                <div className="card card-people-you-know">
                    <span style={{color:"orange",fontSize:"15px",fontWeight:"600"}}>People You may Know</span>
                    { 
                     allUser === [] || allUser === "undefined"? (<span> No Users Found</span>):
                     (
                       allUser.map((users,index)=>{ 
                            return(
                                <div classname="following">

                                <Cardheader users={users} key={index} />
                                </div>
                            )
                        })
                     )
                    }
                    <center>
                    <button className='btn btn-info text-center mb-2' style={{width:"150px"}}>Follow More</button>
                    </center>
                </div>    
            </div>                


        </div>          

        
    </div>
    </>

  )
}

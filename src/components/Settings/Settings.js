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
    let img = '';

    if (currentUser.image) {
        const image64 = btoa(
            new Uint8Array(currentUser.image.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );
        img = `data:${currentUser.image.contentType};base64,${image64}`;
    }
    //fetch all the users
    
    const [image,setimage]=useState([])
    function changepassword(e){
        e.preventDefault();
        console.log(oldpassword,newpassword,confirmpassword)
        const id = window.localStorage.getItem("id");
        if(newpassword===confirmpassword){
            // https://server-7n65.onrender.com
            axios.put(`https://server-7n65.onrender.com/api/changepassword/${id}`,
            {
                oldpassword:oldpassword,
                newpassword:newpassword
                }
                )
            .then(res=>{
                console.log(res.data);
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
    
       
    const allUser = useSelector(state => state.userAllReducer.users); 
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
                        {currentUser.image ?
                        <label htmlFor="file" id="file" ><img src={img} style={{borderRadius:"50%", height:"100px"}} alt="logo" /></label>:
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
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >My Followers</label> 
                    <span> You dont have Followers.</span>                    
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >Following</label> 
                    <span> You dont have Followers.</span>
                    <br/>
                    <label style={{color:"orange",fontSize:"20px",fontWeight:"600"}} >My Posts</label>
                    {countPosts()>=1 ?( 
                    posts.map((post,index)=>{
                        let base64 = btoa(
                            new Uint8Array(post.image.data.data)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                        );
                        let img = `data:;base64,${base64}`;
                        if(post.userid===id){
                                                                                  
                               return(                
                                <div className="card-header" key={index}>                                
                                    <div className="card-list">
                                        <div className="card-item single-card-link" onClick={(e)=>{
                                            e.preventDefault();
                                            dispatch(allActions.set_postId(post._id));
                                            localStorage.setItem("postId",post._id);
                                            window.location.href = "/singlepost/"+post._id;
                                                
                                                
                                            }}>
                                            <div className="card-image" >
                                                <img src={img} alt="logo" style={{height:"50px",width:"50px",borderRadius:"5px"}} />
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
                                <button type='submit' className="btn btn-primary mt-2 mb-2 col-xs-8" style={{width:"40%"}}>Change Password</button>
                            </form> 
                            {wait && <p id="err" style={{color:"red"}}></p>}   
                        </div>
                    </div>
                </div>    
            </div>  
            <div className="col-lg-3 col-md-3 col-sm-8 col-xs-12">
                <div className="card card-people-you-know">
                    <span style={{color:"orange",fontSize:"15px",fontWeight:"600"}}>People You may Know</span>
                    <br/>
                    {
                       allUser.map((users,index)=>{
                            // let base64 = btoa(
                            //     new Uint8Array(user.image.data.data)
                            //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
                            // );
                            // let img = `data:;base64,${base64}`;
                            
                            return(
                                <Cardheader users={users} key={index} />
                            )
                        })
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

import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Popup from '../popup/Popup';
import Edit from '../popup/Edit';
import axios from 'axios';
import "./singlepost.css";
import PostBottomActions from '../Home/PostBottomActions';
import Post from '../Home/Post';


function SinglePost() {
    const [title,settitle] = useState("");
    const [popup,setpopup] = useState(false);
    const [postcontent,setpost] = useState([]);
    const [editpopup,seteditpopup] = useState(false);  
    const id = localStorage.getItem("id");
    const postid = localStorage.getItem("postId");
    const posts = useSelector(state=>state.postReducer.posts);
    const isLoading = useSelector(state=>state.loadingStatusReducer.loadingStatus);
    const navigate = useNavigate();
    function Name(){
        if(posts){
            try{
            const currentPostName = posts.filter(post=>post._id === postid)[0].title;
            return currentPostName;
            }
            catch(err){
                return null;
            }
        }
    }
  return (    
    <div className='container'>
    <div className='row mt-5'>
        <div className='col-lg-4 col-md-4 col-sm-8 col-xs-10'>
        <div className='card'>
            <div className='card-category'>
                <span style={
                    {color:"blue",fontSize:"15px",cursor:"pointer"}
                }><h5 onClick={()=>{
                    navigate("/");
                }}>Home</h5>singlepost{" >>"}{Name()}</span>
                {
                    posts.map((post,index)=>{
                        return(
                            <div className='list-post' key={index}>
                                <img src={post.image} alt='post' className='post-image' height={50} width={50}/>
                                <a href={{}} onClick={(e)=>{
                                    e.preventDefault();
                                    localStorage.setItem("postId",post._id);
                                    window.location.reload();
                                    axios.put(`http://localhost:4000/api/post/increaselike/${post._id}`).then((res)=>{
                                        return null
                                    })

                                }}><h3 style={{color:"black",fontSize:"15px"}}>{post.title}</h3></a>
                            </div>

                        )
                    })
                }
                
            </div>               

        </div>
        </div>
        <div className='col-lg-8 col-md-8 col-sm-8 col-xs-10'>
        {isLoading? <center><div class="lds-roller mt-5"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></center>:null}
            { 
                posts.map((post,index)=>{                  
                    return(
                        post._id === postid && <>
                        <div className='post' key={index}>
                            <div className='post-image'>
                                <img src={post.image} alt='post' className='post-image'/>
                            </div>
                            <div className='post-title'>
                                <h3>{post.title}</h3>
                            </div>
                            <div className='post-description'>
                                <Post post={post} key={index}/>
                            </div>    
                        </div>
                        <div>
                        {id === post.userid?
                        <div className="actions ">
                            <><span onClick={(e)=>{
                                e.preventDefault();
                                setpopup(true);
                                settitle(post.title);
                            }
                            }><button className='bottom-action'><i className="fa fa-trash" style={{color:"red"}}
                            
                            /> Delete</button></span>
                            <span onClick={(e)=>{
                                e.preventDefault();
                                seteditpopup(true);
                                setpost(post)
                            }
                            }>
                            <button className='bottom-action' ><i className="fa fa-edit" style={{color:"green"}}
                            /> Edit</button></span>
                            </>
                        </div>
                        :null
                        }

                        </div>
                        <PostBottomActions post={post} key={index}/>   
                        </>
                    )
                })
            }
        </div> 
        
    </div> 
    {popup?
        <Popup closepopup={()=>{
            setpopup(false);
        }} title={title} id={postid}/>:null
        }
        {editpopup?
        <Edit closepopup={()=>{
            seteditpopup(false);
        }
        }content={postcontent}/>:null
    }        
    </div>   
  )
}

export default SinglePost
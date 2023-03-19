import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Popup from '../popup/Popup';
import Edit from '../popup/Edit';

import "./singlepost.css";
import PostBottomActions from '../Home/PostBottomActions';


function SinglePost() {
    const [title,settitle] = useState("");
    const [popup,setpopup] = useState(false);
    const [postcontent,setpost] = useState([]);
    const [editpopup,seteditpopup] = useState(false);  
    const id = localStorage.getItem("id");
    const postid = localStorage.getItem("postId");
    const posts = useSelector(state=>state.postReducer.posts);
    const isLoading = useSelector(state=>state.loadingStatusReducer.loadingStatus);
  return (    
    <div className='container'>
    <div className='row mt-5'>
        <div className='col-lg-4 col-md-4 col-sm-8 col-xs-10'>
        <div className='card'>
            <div className='card-category'>
                <span> {">>"}Home{">>"}singlepost</span>
                <h3>Posts</h3>
                {
                    posts.map((post,index)=>{
                        let base64 = btoa(
                            new Uint8Array(post.image.data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                '',
                            ),
                        );
                        let image = `data:${post.image.contentType};base64,${base64}`;
                        return(
                            <div className='list-post'>
                                <img src={image} alt='post' className='post-image' height={50} width={50}/>
                                <a href={{}} onClick={(e)=>{
                                    e.preventDefault();
                                    localStorage.setItem("postId",post._id);
                                    window.location.reload();

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
                    // if (postid === post._id){
                        let base64 = btoa(
                            new Uint8Array(post.image.data.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                '',
                            ),
                        );
                        let image = `data:${post.image.contentType};base64,${base64}`;
                    
                    return(
                        post._id === postid && <>
                        <div className='post' key={index}>
                            <div className='post-image'>
                                <img src={image} alt='post' className='post-image'/>
                            </div>
                            <div className='post-title'>
                                <h3>{post.title}</h3>
                            </div>
                            <div className='post-description'>
                                <p>{post.description}</p>
                            </div>    
                        </div>
                        <div>
                        {id ?
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
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import Popup from '../popup/Popup';
import Edit from '../popup/Edit';

import "./singlepost.css";

function SinglePost() {
    const [title,settitle] = useState("");
    const [popup,setpopup] = useState(false);
    const [postcontent,setpost] = useState([]);
    const [editpopup,seteditpopup] = useState(false);  
    const postid = localStorage.getItem("postId");
    const posts = useSelector(state=>state.postReducer.posts);
    console.log(posts);
  return (    
    <div className='container'>
    <div className='row mt-5'>
        <div className='col-lg-4 col-md-4 col-sm-8 col-xs-10'>
        <div className='card'>
            <div className='card-category'>
                <h3>Categories</h3>
                <div className='card-body'>
                    <ul className='list'>
                        <li className='list-group-item'>Health</li>
                        <li className='list-group-item'>Education</li>
                        <li className='list-group-item'>Football</li>
                        <li className='list-group-item'>History</li>
                        <li className='list-group-item'>Marketing</li>
                    </ul>    
                </div>
            </div>               

        </div>
        </div>
        <div className='col-lg-8 col-md-8 col-sm-8 col-xs-10'>
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

                        </div>
                        <div className='post-comments'>
                            <h3>Comments</h3>
                            <div className='comment'>
                                <div className='comment-user'>
                                    <img src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png' alt='user' className='comment-user-image'/>
                                </div>
                                <div className='comment-content'>
                                    <p>Great post</p>
                                </div>
                            </div>    
                        </div>   
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
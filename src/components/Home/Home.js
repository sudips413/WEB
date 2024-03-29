import React from 'react'
import './Posts.css'
import {useEffect} from 'react'
import axios from 'axios';
import {useState} from 'react'
import "@fontsource/open-sans";
import { useSelector,useDispatch} from 'react-redux';
import Popup from '../popup/Popup';
import Edit from '../popup/Edit';
import allActions from '../../actions';
import PostBottomActions from './PostBottomActions';
import Post from './Post';
import LoadingPlaceholder from './SkeletonLoading';
import {
    Box,
    Skeleton,
  } from '@mui/material';
function Home() {

  const [title,settitle] = useState("");
  const [popup,setpopup] = useState(false);
  const [postid,setpostid] = useState(null);
  const [postcontent,setpost] = useState([]);
  const [editpopup,seteditpopup] = useState(false); 
  const dispatch = useDispatch();
  const id = localStorage.getItem("id");
  const posts = useSelector(state=>state.postReducer.posts);
  const acceptCookies = localStorage.getItem("accept-cookies");
    const fetchposts = async()=>{
        
    if (!id && posts.length===0 ){ 
             
        await axios.get("https://blog-1pne.onrender.com/api/posts")   
        .then(res=>{
        dispatch(allActions.setAllPosts.set_posts(res.data)); 
      }
      )
    }
    }
  useEffect(()=>{
    fetchposts();
    },[])
    const isLoading = useSelector(state=>state.loadingStatusReducer.loadingStatus); 
    
  return (
    
    <div className='container container-width'>
        
        {isLoading? 
        <>
        <LoadingPlaceholder/>
        <LoadingPlaceholder/>
        </>
        :null}
        { posts? posts.map((post,index)=>{
            // dispatch(allActions.add_comment(post.comment));
            
            return(
            <>
            <div className='card-body card-body-post col-12 mt-5' key={index} >
                <div className='card-image text-center mb-2'>
                    
                    <img src={post.image}  className="PostImage mx-auto" alt="logo"/>
                </div>
                <div className='card-description details'>
                    <h3 style={{textAlign:"center"}} className='title'>{post.title}</h3>
                    <div className='card-content' id="card-content-descp"> 
                        <Post post={post} key={index} halfContent={true}/>
                    </div>    
                    <hr/>            
                    <div className="actions ">
                        <div><span className='bottom-action username' style={{fontWeight:'600'}}>👤 {post.username}</span></div>              
                        
                        <div><span className='bottom-action'><i className="fa fa-clock-o"/> {new Date(post.date).toDateString()}</span></div>
                        {
                            localStorage.getItem("id")===post.userid?
                            <><div><span onClick={(e)=>{
                                e.preventDefault();
                                setpopup(true);
                                settitle(post.title);
                                setpostid(post._id);
                            }
                            }><button className='bottom-action'><i className="fa fa-trash" style={{color:"red"}}
                            
                            /> Delete</button></span></div>
                            <div><span onClick={(e)=>{
                                e.preventDefault();
                                seteditpopup(true);
                                setpost(post)
                            }
                            }>
                            <button className='bottom-action' ><i className="fa fa-edit" style={{color:"green"}}
                            /> Edit</button></span></div>
                            </>
                            :null

                        }
                    </div>
                    <PostBottomActions post={post}  key={index} />
                </div>
            </div>  
            {/* <hr className='post-separater'/> */}           
            </>
        )        
        }):
        <div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
        </div>
        }
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
    {/* sroll to top       */}
    
    
    {
        // show top button only when the screen is scrolled down to 500px
    
    
        
    <button onClick={()=>{
        window.scrollTo(0,0);
    }} className="btn " style={{
        display:posts.length>0?"block":"none",
        position:"fixed",
        bottom:"20px",
        right:"30px",
        zIndex:"99",
        border:"none",
        outline:"none",
    }}><i className="fa fa-arrow-up"> Top</i></button>
    }
    </div>            
  )
}

export default Home
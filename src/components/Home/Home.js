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
import { useNavigate } from 'react-router-dom';
function Home() {
  const [title,settitle] = useState("");
  const [popup,setpopup] = useState(false);
  const [postid,setpostid] = useState(null);
  const [postcontent,setpost] = useState([]);
  const [editpopup,seteditpopup] = useState(false); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = localStorage.getItem("id");
  const posts = useSelector(state=>state.postReducer.posts); 
    const fetchposts = async()=>{
        
    if (!id && posts===[] ){ 
             
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
        {isLoading? <center style={{marginTop:"20%",color:"red"}}><span color={"red"}>Loading Might take more than 5sec...</span><br/><div class="lds-roller mt-5"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></center>:null}
        { posts? posts.map((post,index)=>{
            // dispatch(allActions.add_comment(post.comment))

            let base64 = btoa(
                new Uint8Array(post.image.data.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            let image = `data:${post.image.contentType};base64,${base64}`;
            return(
            <div className='card-body col-12 mt-5' key={index} >
                <div className='card-image text-center mb-2'>
                    
                    <img src={image}  className="PostImage mx-auto" alt="logo"/>
                </div>
                <div className='card-description details'>
                    <h3 style={{textAlign:"center"}} className='title'>{post.title}</h3>
                    <p className='card-content'>
                        {post.description} <a href={{}} onClick={(e)=>{
                            e.preventDefault();
                            localStorage.setItem("postId",post._id);
                            navigate(`/singlepost/${post._id}`);
                            axios.put(`https://blog-1pne.onrender.com/api/post/increaseview/${post._id}`)
                            .then(res=>{
                                console.log(res.data);
                            })
                            
                        }} className='read-more'>Read More</a>
                    </p>    
                    <hr/>            
                    <div className="actions ">
                        <span className='bottom-action username' style={{fontWeight:'600'}}>👤 {post.username}</span>                        
                        {
                            localStorage.getItem("id")===post.userid?
                            <><span onClick={(e)=>{
                                e.preventDefault();
                                setpopup(true);
                                settitle(post.title);
                                setpostid(post._id);
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
                            :null

                        }
                        <span className='bottom-action'><i className="fa fa-clock-o"/> {new Date(post.date).toDateString()}</span>
                    </div>
                    <PostBottomActions post={post}  key={index} />
                </div>
            </div>  
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
    </div>            
  )
}

export default Home
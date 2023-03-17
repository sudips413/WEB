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

function Home() {
  const [title,settitle] = useState("");
  const [popup,setpopup] = useState(false);
  const [postid,setpostid] = useState(null);
  const [postcontent,setpost] = useState([]);
  const [editpopup,seteditpopup] = useState(false);
  const dispatch = useDispatch();
    const id = localStorage.getItem("id");
    
    const fetchposts = async()=>{
        if(!id){
        await axios.get("https://server-7n65.onrender.com/api/posts")   
        .then(res=>{
            let obj = {
                username:res.data.users.name,
                email:res.data.users.email,
                id:res.data.users._id,
                image:res.data.users.image,
              }
        dispatch(allActions.setAllPosts.set_posts(obj));
      }
      )
    }
    }


  useEffect(()=>{
    fetchposts();
    },[])

  const posts = useSelector(state=>state.postReducer.posts); 

    
  return (
    <div className='container container-width'>
        {posts.map((post,index)=>{
            return(
            <div className='card-body col-12 mt-5' >
                <div className='card-image text-center mb-2'>
                    <img src={`https://server-7n65.onrender.com/${post.image.replace("public/","")}`}  className="PostImage" alt="logo"/>
                </div>
                <div className='card-description details'>
                    <h3 style={{textAlign:"center"}} className='title'>{post.title}</h3>
                    <p className='card-content'>
                        {post.description}
                    </p>    
                    <hr/>            
                    <div className="actions ">
                        <span className='bottom-action username' style={{fontWeight:'600'}}>👤 {post.username}</span>                        
                        {
                            localStorage.getItem("id")===post.userid?
                            <><span><button className='bottom-action'><i className="fa fa-trash" style={{color:"red"}}
                            onClick={(e)=>{
                                e.preventDefault();
                                setpopup(true);
                                settitle(post.title);
                                setpostid(post._id);
                            }
                            }
                            /> Delete</button></span>
                            <span>
                            <button className='bottom-action' ><i className="fa fa-edit" style={{color:"green"}}
                            onClick={(e)=>{
                                e.preventDefault();
                                seteditpopup(true);
                                setpost(post)
                            }
                            }/> Edit</button></span>
                            </>
                            :null

                        }
                        <span className='bottom-action'><i className="fa fa-clock-o"/> {new Date(post.date).toDateString()}</span>
                    </div>
                    <hr/> 
                </div>
            </div>  
        )        
        })
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
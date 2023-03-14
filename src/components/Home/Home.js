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
        dispatch(allActions.setAllPosts.set_posts(res.data));
      }
      )
    }
    }


  useEffect(()=>{
    fetchposts();
    },[])

  const posts = useSelector(state=>state.postReducer.posts); 

    
  return (
    <div className='container mt-5'>
        {posts.map((post,index)=>{
            return(
        <div className='row mt-5 mb-0' key={index}>
            <div className='col-md-12 col-lg-12 col-xs-12'>
                
                    <div className='card-body' >
                        <div className='text-center mb-2'>
                            <img src={`https://server-7n65.onrender.com/${post.image.replace("public/","")}`}  className="PostImage" alt="logo"/>
                        </div>
                        <div className='details'>
                            <h3 style={{textAlign:"center"}} className='title'>{post.title}</h3>
                            <p className='card-content'>
                                {post.description}
                            </p>    
                            <hr/>            
                            <div className="actions ">
                                <span className='bottom-action username'>{post.username}</span>
                               
                                {
                                    localStorage.getItem("id")===post.userid?
                                    <><span className='bottom-action'><i className="fa fa-trash" style={{color:"red"}}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setpopup(true);
                                        settitle(post.title);
                                        setpostid(post._id);

                                    }
                                        

                                    }
                                    /> Delete</span>
                                    <span className='bottom-action' ><i className="fa fa-edit" style={{color:"green"}}
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        seteditpopup(true);
                                        setpost(post)
                                        

                                    }
                                        

                                    }/> Edit</span>
                                    </>
                                    :null

                                }
                                 <span className='bottom-action'><i className="fa fa-clock-o"/> {new Date(post.date).toDateString()}</span>
                            </div>

                        </div>
                    </div>
                    
            </div> 
            
             
        </div>)
        
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
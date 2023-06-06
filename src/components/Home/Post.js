import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Post({post,halfContent}) {
    const navigate = useNavigate();
    function MyComponent() {
        return <>
          <div className="singlepost-div" >
            <div dangerouslySetInnerHTML={{__html: post.description}}
            style={{
            overflow:"hidden",
            textOverflow:"ellipsis ellipsis-2",
            height: halfContent? "150px":"auto",

            }}
            />
          </div>
          </>

      }

  return (
    <>                        
    
    {
        MyComponent()
    }
    
    

    <p>{halfContent?<a href={{}} onClick={(e)=>{
        e.preventDefault();
        localStorage.setItem("postId",post._id);
        navigate(`/singlepost/${post._id}`);
        axios.put(`https://blog-1pne.onrender.com/api/post/increaseview/${post._id}`)
        .then(res=>{
        })
        .catch(err=>{

        })
        
    }} className='read-more'>View More</a> :null}</p>
  
                    
    </>
    
  )
}

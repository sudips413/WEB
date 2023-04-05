import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Post({post}) {
    const navigate = useNavigate();
    function MyComponent() {
        return <div  dangerouslySetInnerHTML={{__html: post.description}} />;

      }
  return (
    <>                        
    <div className="singlepost-div">
    {
        MyComponent()
    }
    </div>
    

    <p><a href={{}} onClick={(e)=>{
        e.preventDefault();
        localStorage.setItem("postId",post._id);
        navigate(`/singlepost/${post._id}`);
        axios.put(`https://blog-1pne.onrender.com/api/post/increaseview/${post._id}`)
        .then(res=>{
        })
        .catch(err=>{

        })
        
    }} className='read-more'>Read More</a>
    </p>  
                    
    </>
    
  )
}

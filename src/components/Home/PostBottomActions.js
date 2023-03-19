import React from 'react'
import "./Posts.css"

function PostBottomActions({post,index}) {
    const [showComments,setshowComments] = React.useState(false);
    function handleDisplayClick(){
        setshowComments(!showComments);
    }
    const [color,setcolor] = React.useState("black");
    function handleColor(color){
        if (color==="black"){
            setcolor("red");
            setlikeCount(likeCount+1);
        }
        else{
            setcolor("black");
            setlikeCount(likeCount-1);
        }
    }
    const [likeCount,setlikeCount] = React.useState(0);
  return (
    <div className='container' >
        <div className='row'>
         <div className="post post-public-actions mt-2">
            <span className='bottom-action'><i className="fa fa-comment-o"/>  1 Comments</span>
            <span className='bottom-action bottom-action-like' onClick={()=>{
                handleColor(color);
            }}><i className={`fa fa-heart fa-${index}`} style={{color:`${color}`,border:"none"}}></i>  {likeCount} Likes</span>
            <span className='bottom-action bottom-action-view'><i className="fa fa-eye"/> 0 Views</span>
        </div>
        <div className='post post-public-comments ml-3'>
            <button className={`btn btn-show-comment btn-show-comments-${index}`} onClick={handleDisplayClick}>{showComments? <span>Hide Comment</span>:<span>show Comments</span>}</button>
            {showComments && <div class={`comment comment-list${index}`}>
                <div class="comment">
                    <div class="comment-author">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" style={{height:"50px",width:"50px",borderRadius:"50%"}} alt="avatar" />
                        <span class="comment-author-name">John Doe</span>
                    </div>
                    <div className='comment-content'>
                        <span>Awesome post!</span>
                    </div>
                    <div className='input-comment'>
                        <input type="text" placeholder="Write a comment..." required/>
                        <br/>
                        <button className='btn btn-show-comment btn-primary' onClick={(e)=>{
                            e.preventDefault();
                            let id= localStorage.getItem("id");
                            if(!id){
                                alert("Please login first");
                                return;
                            }
                        }}>Comment</button>
                    </div>
                </div>       

            </div>    
            }
        </div>  
        </div>  
    </div>
  )
}

export default PostBottomActions
import React from 'react'
import "./Posts.css"
import { useSelector} from "react-redux";
import axios from 'axios';


function PostBottomActions({post,index}) {
    const [showComments,setshowComments] = React.useState(false);
    const [comment,setcomment] = React.useState("");
    const [likes, setlikes] = React.useState(post.likes);
    // const [commentCount,setcommentCount] = React.useState(post.comment.length-1);
    const [views,setviews] = React.useState(post.views);
    const comments = useSelector(state => state.commentReducer);
    function handleDisplayClick(){
        setshowComments(!showComments);
    }
    const [color,setcolor] = React.useState("green");
    function handleColor(color){
        if (color==="green"){
            setcolor("red");
            setlikes(likes+1);
            axios.put(`https://blog-1pne.onrender.com/api/post/increaselike/${post._id}`)
            .then(res=>{
                return null
            })


        }
        else{
            setcolor("green");
            setlikes(likes-1);
            axios.put(`https://blog-1pne.onrender.com/api/post/decreaselike/${post._id}`)
        }
    }
    const [likeCount,setlikeCount] = React.useState(0);
    const currentUser = useSelector(state => state.userReducer);
    const [showNewComment,setshowNewComment] = React.useState(false);
    const [newComment,setnewComment] = React.useState("");
  return (
    <div className='container' >
        <div className='row'>
         <div className="post post-public-actions mt-2">
            <div><a href className='bottom-action bottom-action-comment' onClick={handleDisplayClick}><i className="fa fa-comment" style={{color:"black"}} />  {post.comment.length-1} Comments</a></div>
            <div><span className='bottom-action bottom-action-like' onClick={()=>{
                handleColor(color);
            }}><i className={`fa fa-heart fa-${index}`} style={{color:`${color}`,border:"none"}}></i>  {likes} Likes</span> </div>
            <div><span className='bottom-action bottom-action-view'><i className="fa fa-eye" style={{color:"blue"}}/> {views} Views</span> </div>
        </div>
        <div className='post post-public-comments ml-3'>
            {/* <button className={`btn btn-show-comment btn-show-comments-${index}`} onClick={handleDisplayClick}>{showComments? <span>Hide Comment</span>:<span>show Comments</span>}</button> */}
            {showComments && <div class={`comment comment-list${index}`}>
                <div class="comment mt-2">
                    { 
                    post.comment.map((comment,index)=>{
                        return(
                            comment.username === "" ? null:
                            <div class="comment-author-main" >
                                <div class="comment-author" key={index}>
                                    <img src={comment.image} style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="avatar" />
                                    <span class="comment-author-name" >{comment.username}</span>
                                </div>
                                <div className='comment-content'>
                                    <span style={{marginLeft:"12%"}}>{comment.comment}</span>
                                    { comment.userid === localStorage.getItem("id")?
                                    <button className="btn" > <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                                    </svg></button> :   null
                                    }
                                    
                                </div>
                            </div>
                
                                )
                            })
                    }
                    {showNewComment? <>
                    <div class="comment-author" key={index}>
                        <img src={newComment.image} style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="avatar" />
                        <span class="comment-author-name">{newComment.username}</span>
                    </div>
                    <div className='comment-content'>
                        <span style={{marginLeft:"12%"}}>{newComment.comment}</span>
                        
                    </div> </>
                    :null}
                    <div className='input-comment'>
                        <input type="text" placeholder="Write a comment..." value={comment} onChange={async (e)=>{
                            setcomment(e.target.value);

                        }}required/>
                        <br/>
                        <button className='btn btn-show-comment btn-primary' id={`btn-comment-${index}`} onClick={async (e)=>{
                            e.preventDefault();
                           let id= localStorage.getItem("id");
                            if(!id){
                                document.getElementById('loginFirst').innerHTML="Please Login First to comment";
                            }
                            else{
                                if(comment===""){
                                    document.getElementById('loginFirst').innerHTML="! No comments";
                                }else{
                                document.getElementById(`btn-comment-${index}`).disabled=true;
                                document.getElementById(`btn-comment-${index}`).cursor="not-allowed";
                                const userid = localStorage.getItem("id");
                                const username = currentUser.currentUser.username;
                                const image = currentUser.currentUser.image;
                                const commentObj ={
                                    username:username,
                                    comment:comment,
                                    userid: userid,
                                    image:image
                                }
                                await axios.put(`https://blog-1pne.onrender.com/api/comment/${post._id}`,commentObj)
                                .then(res=>{
                                    setshowNewComment(true);
                                    setnewComment(commentObj);
                                    setcomment("");
                                    document.getElementById(`btn-comment-${index}`).disabled=false;
                                    document.getElementById(`btn-comment-${index}`).cursor="allowed";


                                })
                                .catch(err=>{
                                    console.log(err);
                                    document.getElementById(`btn-comment-${index}`).disabled=false;
                                    document.getElementById(`btn-comment-${index}`).cursor="allowed";
                                })

                            }
                        }
                        }}>Comment</button>
                        <br/>
                        <span id="loginFirst" style={{color:"red"}}></span>
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
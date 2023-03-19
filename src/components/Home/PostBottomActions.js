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
    const [color,setcolor] = React.useState("black");
    function handleColor(color){
        if (color==="black"){
            setcolor("red");
            setlikes(likes+1);
            axios.put(`https://blog-1pne.onrender.com/api/post/increaselike/${post._id}`)
            .then(res=>{
                return null
            })


        }
        else{
            setcolor("black");
            setlikes(likes-1);
            axios.put(`https://blog-1pne.onrender.com/api/post/decreaselike/${post._id}`)
        }
    }
    const [likeCount,setlikeCount] = React.useState(0);
    const currentUser = useSelector(state => state.userReducer);
    const [showNewComment,setshowNewComment] = React.useState(false);
    const [newComment,setnewComment] = React.useState("");

    function converttoimage(post){
        let base64 = btoa(
            new Uint8Array(post.image.data.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                '',
            ),
        );
        let image = `data:${post.image.contentType};base64,${base64}`;
        return image;
    }
  return (
    <div className='container' >
        <div className='row'>
         <div className="post post-public-actions mt-2">
            <span className='bottom-action'><i className="fa fa-comment-o"/>  {post.comment.length-1} Comments</span>
            <span className='bottom-action bottom-action-like' onClick={()=>{
                handleColor(color);
            }}><i className={`fa fa-heart fa-${index}`} style={{color:`${color}`,border:"none"}}></i>  {likes} Likes</span>
            <span className='bottom-action bottom-action-view'><i className="fa fa-eye"/> {views} Views</span>
        </div>
        <div className='post post-public-comments ml-3'>
            <button className={`btn btn-show-comment btn-show-comments-${index}`} onClick={handleDisplayClick}>{showComments? <span>Hide Comment</span>:<span>show Comments</span>}</button>
            {showComments && <div class={`comment comment-list${index}`}>
                <div class="comment">
                    { 
                    post.comment.map((comment,index)=>{
                    let base64 =btoa(
                        new Uint8Array(comment.image.data.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    let image = `data:${comment.image.contentType};base64,${base64}`;
                        return(
                            comment.username === "" ? null:
                            <>
                                <div class="comment-author" key={index}>
                                    <img src={image} style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="avatar" />
                                    <span class="comment-author-name">{comment.username}</span>
                                </div>
                                <div className='comment-content'>
                                    <span style={{marginLeft:"10%"}}>{comment.comment}</span>
                                    
                                </div>
                                </>
                                )
                            })
                    }
                    {showNewComment? <>
                    <div class="comment-author" key={index}>
                        <img src={converttoimage(newComment)} style={{height:"40px",width:"40px",borderRadius:"50%"}} alt="avatar" />
                        <span class="comment-author-name">{newComment.username}</span>
                    </div>
                    <div className='comment-content'>
                        <span style={{marginLeft:"10%"}}>{newComment.comment}</span>
                        
                    </div> </>
                    :null}
                    <div className='input-comment'>
                        <input type="text" placeholder="Write a comment..." value={comment} onChange={async (e)=>{
                            setcomment(e.target.value);

                        }}required/>
                        <br/>
                        <button className='btn btn-show-comment btn-primary' onClick={async (e)=>{
                            e.preventDefault();
                            let id= localStorage.getItem("id");
                            if(!id){
                                alert("Please login first");
                                return;
                            }
                            else{
                                if(comment===""){
                                    alert("Please enter a comment");
                                    return;
                                }else{
                                const postid = post._id;
                                const userid = localStorage.getItem("id");
                                const username = currentUser.currentUser.username;
                                const image = currentUser.currentUser.image;
                                const commentObj ={
                                    username:username,
                                    comment:comment,
                                    userid: userid,
                                    image:image
                                }
                                await axios.put("https://blog-1pne.onrender.com/api/comment/"+postid,commentObj)
                                .then(res=>{
                                    setshowNewComment(true);
                                    setnewComment(commentObj);
                                    setcomment("");


                                })
                                .catch(err=>{
                                })

                            }
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
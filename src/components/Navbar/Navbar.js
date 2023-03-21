import React from 'react'
import allActions from '../../actions';
import { useDispatch } from 'react-redux';
// import logo  from '../image/me.jpg';

import './navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function Header() {
    const dispatch = useDispatch();
    // const [userdetail,setuserdetail]=useState([]);    
  
    const currentUser = useSelector(state => state.userReducer);
    const posts = useSelector(state=>state.postReducer.posts); 
    let image = currentUser.currentUser.image;
  return (
    <>
    <header>
        
        
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid ">
            {currentUser.currentUser.loginStatus? 
            (<Link to="/setting" className="navbar-brand fw-bold d-flex">
                {currentUser.currentUser.image !== ""?

                (
                <div className='circular-image'>
                <img src={image} alt="logo" />
                </div>
                ):
                null
                }
                <span className='blogtitle mt-0'>
                {currentUser.currentUser.username}
                </span>
            </Link>):(
                <span className='blogtitle'>TELLUS</span>
            )}
            <div>
            <button className='displayMenu'  style={{border:"none",borderRadius:"10px",width:"40px",height:"40px"}} onClick={()=>{
                const listsElement = document.getElementById("lists");
                if (listsElement.style.display === "block") {
                    listsElement.style.display = "none";
                } else {
                    listsElement.style.display = "block";
                }
                document.getElementById("navbar-closer").style.display = "block";

            }}><i class="fa fa-bars"></i></button>
            <ul className="navbar-nav ms-auto" id="lists">
                {currentUser.currentUser.loginStatus?
                    (<>
                    <li className="nav-item">
                        <Link className='nav-link' to="/"><i className="fa fa-home">Home</i></Link>
                    </li>
                    <li className="nav-item">
                    <Link className='nav-link' to="/create"><i className='fa fa-edit' >Create</i></Link>
                    </li>
                    <li className="nav-item">
                    <Link className='nav-link' to="/setting"><i className='fa fa-cog'>Setting</i></Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link sign-out" to="/login" onClick={(e)=>{
                        dispatch(allActions.userActions.logout());
                        localStorage.removeItem("id");
                        localStorage.removeItem("postId");
                        dispatch(allActions.setAllPosts.set_posts(posts));
                    }}><i className='fa fa-sign-out' style={{fontSize:"20px"}}></i></Link> 
                    </li>
                    </>):(
                        <>
                        <li className="nav-item">
                        <Link className='nav-link' to="/"><i className="fa fa-home">Home</i></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/login"><i className='fa fa-user'>Sign-in</i></Link>
                        </li>
                        <li className="nav-item">
                        <Link className="nav-link" to="/register"><i className='fa fa-user'>Sign-up</i></Link>
                        </li>
                        </>

                    )}
                    <button className="btn btn-info mb-2" id="navbar-closer" onClick={()=>{
                        // if the width of screen is max of 850px 
                        // then the navbar will be closed
                        if(window.innerWidth <= 850){
                        document.getElementById("lists").style.display = "none";
                        document.getElementById("navbar-closer").style.display = "none";
                        }
                    }
                    } style={{display:"none"}}>close</button>
                    
                
            </ul>
            </div>            
            </div>    
            
        </nav>
    
    </header>
    <br/>
    <br/>
    <br/>
    </>

  )
}

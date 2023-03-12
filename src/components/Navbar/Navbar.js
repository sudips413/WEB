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
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.userReducer);
  return (
    <>
    <header>
        
        
        <nav className="navbar navbar-expand-sm">
            <div className="container-fluid ">
            {currentUser.currentUser.loginStatus? 
            (<Link to="/setting" className="navbar-brand fw-bold d-flex">
                {currentUser.currentUser.image?
                (<img src={`https://server-7n65.onrender.com/${currentUser.currentUser.image}`} style={{borderRadius:"50%", height:"30px"}} alt="logo" />):
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
                    <Link className="nav-link" to="/login" onClick={(e)=>{
                        dispatch(allActions.userActions.logout());
                        localStorage.removeItem("id");
                    }}><i className='fa fa-sign-out'>Logout</i></Link>
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
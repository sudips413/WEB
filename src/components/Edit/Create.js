import React from 'react'
// import './Create.css'
import axios from 'axios';
import gif from '../../components/image/giphy.gif'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Editor } from "@tinymce/tinymce-react";


export default function Create() {
    const [title,settitle]=React.useState("");
    const [description,setdescription]=React.useState("");
    const [image,setimage]=React.useState([]);
    const [wait,setwait]=React.useState(true);
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.userReducer.currentUser);
  return (
    <>
    <div className='container mt-5'>
        <div className='row'>
            <div className='col-2'>
             </div>   
              
           
            <div className='col-lg-8 col-md-8 col-xs-10'>
            <div className='postidea'>
                <div className='row '  style={{fontFamily:"monospace"}}>
                    <center>
                    <img src={gif} alt="logo" style={{height:"200px",width:"200px"}} />
                    <br/>
                    <label>Create new Post</label>
                    </center>
                   
                    <div className='col-lg-12 col-md-12 col-xs-12'>
                    <form className="col-12 createform"id="myform" onSubmit={(e)=>{
                        e.preventDefault();
                        document.getElementById("error").innerHTML="Posting...";
                        const data = new FormData();
                        data.append("title",title);
                        data.append("description",description);
                        data.append("file",image);
                        data.append("userid",currentUser.id);
                        data.append("username",currentUser.username);
                        
                        axios.post("https://blog-1pne.onrender.com/api/create",data,{
                            headers:{
                                "Content-Type":"multipart/form-data"                       }

                        })
                        .then((res)=>{
                            if(res.data.success){
                                setTimeout(()=>{
                                setwait(false);
                                },500);
                                document.getElementById("myform").reset();
                                window.location.href="/";
                                                             
                            }
                            else{
                                alert("Post not added");
                            }
                        })
                        .catch((err)=>{
                            alert("Error:"+err);
                        }
                        )
                        
                    }}>
                        
                            
                            <label>Title</label>
                            <input type='text' className='form-control' id='title' placeholder='Enter Title' onChange={(e)=>{
                                if(e.target.value.length>=3){
                                    settitle(e.target.value);
                                    document.getElementById("title").style.border="2px solid green";
                                }
                                else{
                                    
                                    document.getElementById("title").style.border="2px solid red";
                                    ;
                            
                                }
                                settitle(e.target.value);
                            }}  style={{width:"50%"}} required/>
                            <label >Image</label>
                            <input type='file' accept="image/png, image/gif, image/jpeg" name='file' onChange={(e)=>{
                                setimage(e.target.files[0]);
                            }} className='form-control' id='image' placeholder='Enter Image' style={{width:"50%"}} required/>
                            <label for='description'>Description</label>
                            <Editor 
                            apiKey="uysetdm5b097olv64hv0dduduaq16b12fzw935px9x45rfxq"
                            init={{
                              height: 300,
                            //   plugins: [
                            //     " advcode advlist advtable anchor autocorrect autosave editimage image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",
                            //   ],
                              toolbar:
                                "undo redo | blocks fontfamily fontsize | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify lineheight | removeformat | link ",
                              menubar: false,
                              block_formats: "Paragraph=p; Header 1=h1; Header 2=h2; Header 3=h3",
                              content_style: `
                                    body {
                                      font-family: Arial, sans-serif;
                                      margin: 12px;
                                    }
                                    h1, h2, h3, p {
                                      color: #4D66CB;
                                      margin: 5px;
                                    }
                                    `,
                            }}
                            onEditorChange={(content, editor) => {
                                setdescription(content);
                                console.log(content);
                            }}
                            />
                            {/* <textarea className='form-control' id='description' placeholder='Enter Description' rows='5' onChange={(e)=>{
                                
                                setdescription(e.target.value);
                              
                                
                            }} required></textarea> */}
                            
                            <br/>
                            <button type='submit' className='btn btn-primary postbtn'>Post</button>
                            {wait && <p id="error" style={{color:"green",fontSize:"20px"}}></p>}
                            
                        
                        </form>    
                    </div>
                </div>            

            </div>
                
                

            </div>    
        </div>    
    </div>
    </>
  )
}

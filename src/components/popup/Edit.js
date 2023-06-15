import React from 'react'
import './edit.css'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

export default function Edit({closepopup,content}) {
		const[newtitle,setnewtitle]=React.useState(content.title);
		const[newcontent,setnewcontent]=React.useState(content.description);
		const image = document.getElementById("image");
		const currentUser = useSelector(state => state.userReducer.currentUser);

		return (
		<div className="popup-container">
		 <div className="popup-body col-lg-10 col-md-10 col-xs-12">
				<center>
			<button className="close-btn mr-0 mt-2"  onClick={closepopup}>X</button>
				<h3 className="text-center ">Edit {content.title} Post</h3>
				<form  onSubmit={(e)=>{
								e.preventDefault();
								document.getElementById("error").innerHTML="Updating...";
								document.querySelector(".btn2").disabled=true;


								const data = new FormData();
								data.append("title",newtitle);
								data.append("description",newcontent);
								data.append("file",image);
								data.append("userid",window.localStorage.getItem("id"));
								data.append("username",currentUser.username);
								

								axios.put(`https://blog-1pne.onrender.com/api/update/${content._id}`,data,{
										headers:{
												"Content-Type":"multipart/form-data"                      
										}
														
								})   
								.then(res=>{
										document.getElementById("error").innerHTML=res.data.message;
										setTimeout(() => {
												window.location.reload();
										}, 500);
										document.querySelector(".btn2").disabled=false;
								})
								.catch(err=>{
										alert(err);
										document.querySelector(".btn2").disabled=false;
								})

					}}>
									
						
						<input type="text" defaultValue={content.title} className="form-control" id="title" aria-describedby="emailHelp" onChange={(e)=>{
								setnewtitle(e.target.value);
						}} required  />
					
					
					<Editor 
						apiKey="uysetdm5b097olv64hv0dduduaq16b12fzw935px9x45rfxq"
						init={{
							height: 300,
								// plugins: [
								// 	"a11ychecker advcode advlist advtable anchor autocorrect autosave editimage image link linkchecker lists media mediaembed pageembed powerpaste searchreplace table template tinymcespellchecker typography visualblocks wordcount",
								// ],
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
						initialValue={content.description}
						onEditorChange={(content, editor) => {
							setnewcontent(content);
						}}
					/>

						
						{/* <textarea className="form-control" defaultValue={content.description} id="edescription" rows="5" onChange={(e)=>{
								setnewcontent(e.target.value);

								
						}}required></textarea> */}
					{/* <div className="form-group">
						<input type="file" id="image" className="form-control mt-2" accept="image/png, image/gif, image/jpeg" 
						src={content.image}
					 />
					</div> */}
					<center>
					<button type="submit" className="btn2 btn-primary mt-2">Update</button>
					</center>
					<p id="error"></p>

				</form>
			
				</center>
			</div>
			
			
		 </div>
	
			);
}

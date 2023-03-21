import React from 'react'
import axios from 'axios';

function Cardheader({users,index}) {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowClick = () => {
      setIsFollowing(!isFollowing);
      const followGarneManxeId = localStorage.getItem("id");
        const followHuneManxeId = users._id;
      if (!isFollowing){        
        axios.put(`https://blog-1pne.onrender.com/api/user/follow/${followGarneManxeId}`,{id:followHuneManxeId}).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log("error follow")
          console.log(err);
        })
      }
      else{
        axios.put(`https://blog-1pne.onrender.com/api/user/unfollow/${followHuneManxeId}`,{id:followGarneManxeId}).then((res)=>{
          console.log(res);
        }).catch((err)=>{
          console.log("error unfollow")
          console.log(err);
        })
      }

    };
  return (
   <div className="card-header">
         <div className="card-header" key={index}>
      <img
        src={users.image}
        alt="logo"
        style={{ height: "50px", width: "60px", borderRadius: "5px" }}
      />
      <span>{users.name}</span>
      <br />
      <button
        className={`btn btn-follow-${index} mt-3 text-center`}
        onClick={handleFollowClick}
        style={{
          backgroundColor: isFollowing ? "green" : "white",
          color: isFollowing ? "white" : "black"
        }}
      >
        {isFollowing ? "Following" : "+ Follow"}
      </button>
    </div>
    
    </div>
  )
}

export default Cardheader
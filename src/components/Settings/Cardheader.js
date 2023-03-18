import React from 'react'

function Cardheader({users,index}) {
    const [isFollowing, setIsFollowing] = React.useState(false);

    const handleFollowClick = () => {
      setIsFollowing(!isFollowing);
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
import React from "react";
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

const LoadingPlaceholder = () => {
  return (
	<div className='card-body card-body-post col-12 mt-5'>
      <div className='card-image text-center mb-2'>
        <Skeleton variant="rectangular" width="100%" height={300} /> {/* Set width to 100% */}
      </div>
      <div className='card-description details'>
        <Skeleton variant="text" halfWidth height={30} /> {/* You can adjust halfWidth based on your design */}
        <div className='card-content' id="card-content-descp">
          <Skeleton variant="text" fullWidth height={250} /> {/* Set fullWidth for responsiveness */}
        </div>
        <div className="actions">
          <Skeleton variant="text" width="20%" height={30} />
          <Skeleton variant="text" width="20%" height={30} />
          <Skeleton variant="text" width="20%" height={30} />
        </div>
			
		</div>
	</div>  
  );
};

export default LoadingPlaceholder;

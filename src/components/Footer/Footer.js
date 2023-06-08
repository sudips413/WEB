import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div className='footer' style={{
      marginTop:"100px"
    }}>
      <p>© 2021 - {
        new Date().getFullYear()} All Rights Reserved 
        <br/>
        Created by <a href='sudip-shrestha.com.np'>Sudip Shrestha</a>
        <br/>
        <br/>
      </p>
    
    </div>  
  )
}

export default Footer
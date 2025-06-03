"use client";
import React from 'react'

const Clickbutton = () => {
    const handleClick = ()=>{
        alert("Button clicked");
      }
    
  return (
    <button onClick={handleClick}>Click</button> 
  )
}

export default Clickbutton

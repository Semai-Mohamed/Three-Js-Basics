/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'

function Text() {
    const [top ,settop] = useState(false)
    
    const myref = useRef(null)
    const myref2 = useRef(null)
    useEffect(()=>{
        const maintext = myref.current
        const secondtext = myref2.current
        const clickhandler = () =>{
            console.log( )
            if( window.innerHeight >= maintext.getBoundingClientRect().top+300){
                maintext.parentNode.style.opacity = 1
               settop(true)
            }
            else{
                maintext.parentNode.style.opacity = 0
                settop(false)
            }
         

        }
        window.addEventListener('scroll',clickhandler)
        return ()=>{
            window.removeEventListener('scroll',clickhandler)
        }
    })
  return (
    <div className='text' >
        <div className={`maintext ${top ? 'top' : ''}`}  ref={myref}>
            <div className='small'>Introduction</div>
            <div className='big'>Overview</div>
        </div>
        <div className='secondtext' ref={myref2}>I'm A 3D User Web Developer is a versatile and innovative professional who specializes in creating immersive 3D web experiences. With a deep understanding of both web development and 3D design, they bring interactive and visually captivating content to the digital realm. These developers are at the forefront of crafting cutting-edge web applications, websites, and online platforms that engage users in novel and exciting ways.</div>
    </div>
  )
}

export default Text
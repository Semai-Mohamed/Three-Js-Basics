/* eslint-disable no-unused-vars */
import { click } from '@testing-library/user-event/dist/click'
import React, { useEffect, useRef, useState } from 'react'

function Skills() {
const myref = useRef(null)
const [clear ,setclear] = useState([])
useEffect(()=>{
    const clickhandler = ()=>{
        const skills = myref.current
        const myskills = Array.from(skills.children)
       
      
     
           
            
            skills.style.opacity = 1
            for (let i = 0; i < 4; i++) {
                const time = () => {
                  
                    myskills[i].style.opacity = 1;
                    myskills[i].style.marginLeft = '50px'
                 
                  }; 
                  if (window.innerHeight >= skills.getBoundingClientRect().top + 100) {
                    
                     setclear(clear => [...clear ,setTimeout(time, 500 * (i + 1))])
                  } else {
                 
                    myskills[i].style.marginLeft = '0px'
                  
                    myskills[i].style.opacity = 0;
                  
                }
            }
        
       
    }
    window.addEventListener("scroll",clickhandler)
    return ()=>{
        window.removeEventListener("scroll",clickhandler)
        for (let i = 0; i < 4; i++) {
            clearTimeout(clear[i]);
        }
    }
},)
    
  return (
    <div className={`skills `} ref={myref}>
<div className='skill s1'>

<div className='skillImg'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png' alt='' className='react2'></img>

</div>
<div className='description'>
React developer
</div>
</div>
<div className='skill s2' >

<div className='skillImg'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1920px-Vue.js_Logo_2.svg.png' alt='' className='react'></img>
</div>
<div className='description'>
Vue developer
</div>
</div>
<div className='skill s3'>
<div className='skillImg'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1024px-React-icon.svg.png' alt='' className='react'></img>
</div>
<div className='description'>
React native developer
</div>
</div>
<div className='skill s4'>
<div className='skillImg'>
<img src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/1180px-Node.js_logo.svg.png' alt='' className='react' style={{width : '120px'}}></img>
</div>
<div className='description'>
backend developer
</div>
</div>

    </div>
  )
}

export default Skills
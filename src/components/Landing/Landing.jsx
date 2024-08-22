import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {

    const [btn, setBtn] = useState(false) 

    const refWolverine = useRef(null)

    useEffect(()=> {
        refWolverine.current.classList.add('startingImg')
        setTimeout(()=> {
            refWolverine.current.classList.remove('startingImg')
            setBtn(true)
            
        }, 1000)
    }, [])

    const displayLeft =()=> {
        refWolverine.current.classList.add('leftImg') 
    }

    const displayRight =()=> {
        refWolverine.current.classList.add('rightImg')  
    }

    const leftImg = () => {
        if (refWolverine.current.classList.contains('leftImg')) {
            refWolverine.current.classList.remove('leftImg')
        } else if (refWolverine.current.classList.contains('rightImg')) {
            refWolverine.current.classList.remove('rightImg')
        }
    }
    

    const displayBtn = btn ? ( 
        <>
            <div onMouseOver={displayLeft} onMouseLeave={leftImg} className="leftBox">
                <Link to="/signup" className='btn-welcome'>Inscription</Link>
            </div>
            <div onMouseOver={displayRight} onMouseLeave={leftImg} className="rightBox">
                <Link to="/login"  className='btn-welcome'>Connexion</Link>
            </div>
        </>
    ) : ('')


  return (
    <main ref={refWolverine} className='welcomePage'>
        {displayBtn}
    </main>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase/Context'
import { useNavigate } from 'react-router-dom'
import { Tooltip } from 'react-tooltip'

export default function Logout({userData}) {
    const pseudo = !!userData ? (userData.pseudo):('')

    const [checked, setChecked] = useState(true)
    const {logout, currentUser} = useContext(FirebaseContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (!checked) {
            logout()
            console.log("Deconexion")
            console.log(currentUser)

            setTimeout(() => {
                navigate('/')
            }, 5000);
        }
    }, [checked, logout, currentUser])
    
    const handleCahnge = e => {
        setChecked(e.target.checked) 
    }

  return (
    <div className='logoutContainer' >
        <Tooltip anchorSelect=".switch" className='example-orange' place="left">Deconnexion</Tooltip>
        <label htmlFor="" className='switch'>
            <input onChange={handleCahnge} type="checkbox" checked={checked} name="" id="" />
            <span className="slider round"></span>
        </label>
        <h2><b style={{color:'crimson'}}>{pseudo.toUpperCase()}</b></h2> 
    </div>
  )
}
 
import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../Firebase/Context'
import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPassword() {

    const [email, setEmail] = useState('')
    const [btn, setBtn] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const {resetPassword} = useContext(FirebaseContext)

    const navigate = useNavigate()
  
    const handleCahnge = (e) => {
      const {id, value} = e.target
      if (id==='email') {setEmail(value)}
    }
  
    // submit button
    useEffect(() => {
        if (email !== '') {
          setBtn(true)
        }else  {
          setBtn(false)
        } 
    }, [btn, email])

    // handleSubmit

    const handlesubmit = async (e) => { 
      e.preventDefault()
      await resetPassword(email)
      .then(()=>{
        setError('')
        setSuccess(`Un Mail de récupération vous a été envoyé à ${email}`)
        setTimeout(() => {
          navigate('/login')
        }, 5000);
      })
      .catch(error =>{
        setError(error)
      })
    }
  
    // success message
    const successMsg = success!=='' && <span style={{background:'green', border:'1px solid green', color:'#ffffff'}}>{success}</span>

    // error message
    const errorMsg = error !== '' && <span>{error.message}</span>

  return (
    <div className='signUpLoginBox'>
    <div className="slContainer">
      <div className="formBoxLeftForget">
      </div>

      <div className="formBoxRight">
        <div className="formContent">
          {errorMsg} {successMsg}
          <h2>Mot de passe Oublié ?</h2>

          <form action="" onSubmit={handlesubmit}>
            <div className="inputBox">
              <input onChange={handleCahnge} value={email} type="email" id='email' autoComplete='off' required />
              <label htmlFor="email">Email</label>
            </div>
            
            { (btn) ? (<button>Récupérer</button> ) : (<button disabled>Récupérer</button> )}

          </form>
          <div className='linkContainer' >
            <Link className='simpleLink' to='/signup'>Noveau sur marvel Quiz ? Inscrivez-vous Maintenant.</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

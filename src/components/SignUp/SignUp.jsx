import React, { useContext, useState } from 'react'
import {FirebaseContext} from '../Firebase/Context'
import { Link, useNavigate } from 'react-router-dom'
import { setDoc, doc } from 'firebase/firestore'
import { db } from '../Firebase/Firebase'

export default function SignUp() {
  const {register} = useContext(FirebaseContext) 
  const navigate = useNavigate()

  const data = {
    pseudo: '',
    email: '',
    password: '',
    confirmPassword: '' 
  }

  const [signUpData, setSignUpData] = useState(data)
  const [error, setError] = useState('')

  const { pseudo, email, password, confirmPassword } = signUpData
  
  const handleChange = (e) => {
    const {id, value} =  e.target
    setSignUpData(prevSate =>({
      ...prevSate,
      [id]:value 
    }))
  }

  // Subcription button
  const singUpBtn  = pseudo === '' || email ==='' || password ==='' || confirmPassword !== password ? <button disabled>Inscription</button> : <button>Inscription</button>
  
  // handle Submit
  const handleSubmite = async (e) => { 
    e.preventDefault()
    try {
      const {email, password } = signUpData
      const userCredential = await register(email, password)
      console.log(userCredential);

      if (userCredential !== null) {
          setDoc(doc(db, 'Users', userCredential.uid),{
          email:email,
          pseudo:pseudo}
        )
        setSignUpData({...data})
        navigate('/login')
      }
    } catch (error) {
      setError(error.message)
      setSignUpData({...data})
    }
  }

  // Error Message 
  const errorMsg = error !== '' && <span>{error}</span>

  return ( 
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftSignup">
        </div>

        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Inscription</h2>
            <form action="" onSubmit={handleSubmite}>

              <div className="inputBox">
                <input onChange={handleChange} value={pseudo} type="text" id='pseudo' autoComplete='off' required />
                <label htmlFor="pseudo">Pseudo</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={email} type="email" id='email' autoComplete='off' required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={password} type="password" id='password' autoComplete='off' required />
                <label htmlFor="password">Mot de passe</label>
              </div>

              <div className="inputBox">
                <input onChange={handleChange} value={confirmPassword} type="password" id='confirmPassword' autoComplete='off' required />
                <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
              </div>
              {singUpBtn}
            </form>
            <div className='linkContainer' >
              <Link className='simpleLink' to='/login'>Déja inscit ? Connextez-vous.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

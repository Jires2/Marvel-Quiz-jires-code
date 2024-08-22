import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../Firebase/Context'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login} = useContext(FirebaseContext)
  const [btn, setBtn] = useState(false)

  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleCahnge = (e) => {
    const {id, value} = e.target
    if (id==='email') {setEmail(value)}
    if (id==='password') {setPassword(value)}
  }

  // submit button
  useEffect(() => {
      if (password.length > 5 && email !== '') {
        setBtn(true)
      }else  {
        setBtn(false)
      } 
  }, [btn, email, password])

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(email, password)
    .then((user) => {
      navigate('/welcome')
      console.log(user)
    })
    .catch(error => {
      if (error.code === 'auth/user-not-found') {
        setError('Utilisateur non trouvé. Veuillez vérifier votre adresse email.')
        setEmail('')
        setPassword('')
      } else if (error.code ==='auth/wrong-password') {
        setPassword('')
        setError('Mot de passe incorrect.')
        setPassword('')
      } else {
        setError('Une erreur s\'est produite. Veuillez réessayer plus tard.')
      }
    })
  } 

  // error message
  const errorMsg = error !== '' && <span>{error}</span>

  return (
    <div className='signUpLoginBox'>
      <div className="slContainer">
        <div className="formBoxLeftLogin">
        </div>

        <div className="formBoxRight">
          <div className="formContent">
            {errorMsg}
            <h2>Connexion</h2>
            <form action="" onSubmit={handleLogin}>

              <div className="inputBox">
                <input onChange={handleCahnge} value={email} type="email" id='email' autoComplete='off' required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="inputBox">
                <input onChange={handleCahnge} value={password} type="password" id='password' autoComplete='off' required />
                <label htmlFor="password">Mot de passe</label>
              </div>
              
              { (btn) ? (<button>Connexion</button> ) : (<button disabled>Connexion</button> )}

            </form>
            <div className='linkContainer' >
              <Link className='simpleLink' to='/signup'>Noveau sur marvel Quiz ? Inscrivez-vous Maintenant.</Link>
              <br /> <br />
              <Link className='simpleLink' to='/forgetpassword'>Mot de passe Oublié ? Récupérer Votre ici.</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

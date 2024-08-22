
import '../../App.css'

import Header from '../Header/Header'
import Landing from '../Landing/Landing' 
import Footer from '../Footer/Footer.jsx'
import Welcome from '../Welcome/Welcome.jsx'
import Login from '../Login/Login.jsx'
import SignUp from '../SignUp/SignUp.jsx'
import ErrorPage from '../ErrorPage/ErrorPage.jsx'
import ForgetPAssword from '../ForgetPassword/ForgetPassword.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function App() { 
  return (
    <BrowserRouter>
      <Header/> 

      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/welcome' element={<Welcome/> } />
        <Route path='/forgetpassword' element={<ForgetPAssword/> } /> 
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>

      <Footer/> 
    </BrowserRouter>
  )
}

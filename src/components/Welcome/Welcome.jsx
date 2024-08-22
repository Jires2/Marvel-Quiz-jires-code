import React, { useContext, useEffect, useState } from 'react'
import Logout from '../Logout/Logout'
import Quiz from '../Quiz/Quiz'
import { FirebaseContext } from '../Firebase/Context'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../Firebase/Firebase'
import { onAuthStateChanged } from 'firebase/auth'

export default function Welcome () {

  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null)
  const {auth} = useContext(FirebaseContext)
  const navigate = useNavigate()

  useEffect(()=> {
    const subscribe = onAuthStateChanged(auth,(user)=> {
      user ? setUser(user) : navigate('/')
    })
    
    if (!!user && userData===null) {
      console.log(user)

      const fetchData = async () => {
        try {
          const docRef = doc(db, 'Users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setUserData(docSnap.data());
            console.log(userData)
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
      fetchData(); 
    }
    return ()=> {
      subscribe()
    }

  },[user, userData])


  return user === null ? (
    <>
      <div className="loader"></div>
      <p className='loaderText'>Loading...</p>
    </>
  ) : (
    <div className='quiz-bg'>
      <div className="container">
        <Logout userData={userData}/> 
        <Quiz />
      </div>
    </div>
  )
}

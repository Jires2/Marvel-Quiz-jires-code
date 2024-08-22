import React, { createContext, useState } from 'react';
import {auth} from './Firebase'
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'firebase/auth';

const FirebaseContext = createContext()

export default function AuthProvider ({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
  
    const login = async (email, password) => {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user)
      return userCredential.user
    };
  
    const register = async (email, password) => {
      await createUserWithEmailAndPassword(auth, email, password);
      return auth.currentUser
    };
  
    const logout = () => {
      signOut(auth).then(() => {
        setCurrentUser(null)
      });
    };

    const resetPassword = async (email) => {
      await sendPasswordResetEmail(auth, email)
    }
  
    return (
      <FirebaseContext.Provider value={{ auth, login, register, logout, resetPassword, currentUser }}>
        {children}
      </FirebaseContext.Provider>
    );
  };
export {FirebaseContext}
import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "./Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut, 
  onAuthStateChanged
}from 'firebase/auth'

import { doc, setDoc, onSnapshot} from 'firebase/firestore'


const UserContext = createContext();

export const AuthContextProvider = ({children}) => {

    const [user, setUser] = useState({})
 

    const signUp = async (email, password) => {
      
      
      await setDoc(doc(db, 'users', email), {
        watchList: [],
      })

     return createUserWithEmailAndPassword(auth, email, password)
     
  
     
      
    }



    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logout = () => {
        return signOut(auth);
    }

    useEffect(() => {
    
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      
        setUser(currentUser)

        
       
      })
      
      return () => {
        
        unsubscribe();
       
      }
     
    }, [])

    return (
        <UserContext.Provider value={{signUp, signIn, logout, user}}>
            {children}
        </UserContext.Provider>
    )


}


export const UserAuth = () => {
    return useContext(UserContext)
}

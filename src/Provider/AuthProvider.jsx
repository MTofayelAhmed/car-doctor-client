import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase.config";


export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();
  const createUser = (email, password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password);
  };

const logIn = (email, password)=>{
 setLoading(true)
  return signInWithEmailAndPassword(auth, email, password)
}

const googleSignIn = ()=>{
return signInWithPopup(auth, googleProvider)
}


  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUsers(currentUser);
      setLoading(false)
      if(currentUser && currentUser.email){
        const loggedUser = {
          email: currentUser.email
        }

        fetch('http://localhost:5000/jwt',{
         method: 'POST',
         headers:{
          'content-type': 'application/json'
         },
         body: JSON.stringify(loggedUser) 
        })
        .then(res => res.json())
        .then(data =>{ 
          localStorage.setItem('car-access-token', data.token)
          
        
          console.log("token for signIn ", data.token)})}
          else{
            localStorage.removeItem('car-access-token')
          }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const logOut = ()=>{
    setLoading(true)
    return signOut(auth)
  }

  const authInfo = {
    users,
    loading,
    createUser,
    logIn, 
    logOut,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

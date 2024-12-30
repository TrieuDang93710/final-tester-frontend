/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function AuthProvider({children}) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // Create an account
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  // signup with gmail
  const signUpWithGmail = () => {
    // setLoading(true)
    return signInWithPopup(auth, googleProvider);
  };
  // Login using email & password
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  // Logout
  const logout = () => {
    localStorage.removeItem("genius-token");
    localStorage.removeItem("token");
    localStorage.removeItem("access-token");
    localStorage.removeItem("ally-supports-cache");
    localStorage.removeItem("chakra-ui-color-mode");
    localStorage.removeItem("refresh-token");

    return signOut(auth);
  };
  // update user profile
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name, photoURL: photoURL
    });
  };
  // check signed-in user
  useEffect(() => {
    const unSubcribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        if (currentUser) {
          const userInfor = {
            email: currentUser.email
          };
          axios.post("http://localhost:8080/jwt", userInfor)
            .then((res) => {
              // console.log(res)
              if (res.data.token) {
                localStorage.setItem("access-token", res.data.token);
              }
            });
        } else {
          localStorage.removeItem();
        }
        setLoading(false);
      }
    });
    return () => {
      return unSubcribe();
    };
  }, []);


  const authInfor = {
    user,
    createUser,
    signUpWithGmail,
    login,
    logout,
    updateUserProfile,
    loading
  };
  return (
    <AuthContext.Provider value={authInfor}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider
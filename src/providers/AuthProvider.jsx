import axios from "axios";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../../firebase.config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const dbUser = await fetchMongoUser(currentUser.email);
          setUser({ ...currentUser, ...dbUser });
        } catch (error) {
          console.error("Mongo user fetch failed:", error);
          setUser(currentUser);
        } finally {
          setIsUserLoading(false);
        }
      } else {
        setUser(null);
        setIsUserLoading(false);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  const fetchMongoUser = async (email) => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/users/${email}`
    );
    return res.data;
  };

  const userSignup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  const updateUserProfile = (user, name, photoURL) => {
    return updateProfile(user, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  const userLogout = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    setUser,
    isUserLoading,
    userSignup,
    userLogin,
    userLogout,
    loginWithGoogle,
    updateUserProfile,
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export { AuthContext, AuthProvider };

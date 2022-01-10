import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp({
  apiKey: process.env.NEXT_PUBLIC_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECTID,
  appID: process.env.NEXT_PUBLIC_APPID,
});

interface contextTypes {
  user: firebase.User | false;
  signin: (email: string, password: string) => Promise<firebase.User | null>;
  signup: (email: string, password: string) => Promise<firebase.User | null>;
  signout: () => Promise<void>;
  sendPasswordResetEmail: (email: string) => Promise<boolean>;
  confirmPasswordReset: (code: string, password: string) => Promise<boolean>;
}

const authContext = createContext<contextTypes>({} as contextTypes);

export function ProvideAuth({ children }: any) {
  const auth = useProvideAuth();
  //@ts-ignore
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | boolean | null>();

  const signin = async (email: string, password: string) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };
  const signup = async (email: string, password: string) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(response.user);
    return response.user;
  };
  const signout = async () => {
    await firebase.auth().signOut();
    setUser(false);
  };
  const sendPasswordResetEmail = async (email: string) => {
    await firebase.auth().sendPasswordResetEmail(email);
    return true;
  };
  const confirmPasswordReset = async (code: string, password: string) => {
    await firebase.auth().confirmPasswordReset(code, password);
    return true;
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);
  return {
    user,
    signin,
    signup,
    signout,
    sendPasswordResetEmail,
    confirmPasswordReset,
  };
}

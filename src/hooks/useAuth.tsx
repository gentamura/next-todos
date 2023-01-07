import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';
import { auth } from '../lib/firebase';

type AuthContext = {
  currentUser: User | null;
  isAuthLoading: Boolean;
  logIn: () => Promise<void>;
  logOut: () => Promise<void>;
};

const defaultContext = {
  currentUser: null,
  isAuthLoading: true,
  logIn: () => Promise.resolve(),
  logOut: () => Promise.resolve(),
};

const AuthContext = createContext<AuthContext>(defaultContext);

const useAuth = () => useContext<AuthContext>(AuthContext);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [currentUser, setCurrentUser] = useState<AuthContext['currentUser']>(defaultContext.currentUser);
  const [isAuthLoading, setIsAuthLoading] = useState<AuthContext['isAuthLoading']>(defaultContext.isAuthLoading);

  const logIn = async () => {
    await signInWithPopup(auth, new GoogleAuthProvider());
  };

  const logOut = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });

    return () => {
      unsubscribed();
    };
  }, []);

  const value = {
    currentUser,
    isAuthLoading,
    logIn,
    logOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };

export default useAuth;

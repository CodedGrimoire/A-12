"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  User as FirebaseUser,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

type User = {
  uid: string;
  email: string;
  name?: string;
  contact?: string;
  nid?: string;
  photoUrl?: string;
};

type AuthContextShape = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: () => Promise<User>;
  register: (user: {
    nid: string;
    name: string;
    email: string;
    contact: string;
    password: string;
  }) => Promise<User>;
  logout: () => void;
};

const PROFILE_KEY = "carexyz_profiles";

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(mapFirebaseUser(fbUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const mapped = mapFirebaseUser(cred.user);
    setUser(mapped);
    return mapped;
  }, []);

  const loginWithGoogle = useCallback(async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    const mapped = mapFirebaseUser(cred.user);
    setUser(mapped);
    return mapped;
  }, []);

  const register = useCallback(
    async (newUser: {
      nid: string;
      name: string;
      email: string;
      contact: string;
      password: string;
    }) => {
      const cred = await createUserWithEmailAndPassword(
        auth,
        newUser.email.trim(),
        newUser.password,
      );
      await updateProfile(cred.user, { displayName: newUser.name });
      storeProfile(cred.user.uid, {
        nid: newUser.nid,
        contact: newUser.contact,
        name: newUser.name,
      });
      const mapped = mapFirebaseUser(cred.user);
      setUser(mapped);
      return mapped;
    },
    [],
  );

  const logout = useCallback(() => {
    signOut(auth);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, loginWithGoogle, register, logout }),
    [user, loading, login, loginWithGoogle, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function mapFirebaseUser(fbUser: FirebaseUser): User {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
  const extra = profiles[fbUser.uid] || {};
  return {
    uid: fbUser.uid,
    email: fbUser.email || "",
    name: fbUser.displayName || extra.name,
    contact: extra.contact,
    nid: extra.nid,
    photoUrl: fbUser.photoURL || extra.photoUrl,
  };
}

function storeProfile(
  uid: string,
  profile: { nid: string; contact: string; name: string; photoUrl?: string },
) {
  const profiles = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
  profiles[uid] = profile;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profiles));
}

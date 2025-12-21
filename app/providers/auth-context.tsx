"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type User = {
  nid: string;
  name: string;
  email: string;
  contact: string;
  password: string;
};

type AuthContextShape = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (user: User) => Promise<User>;
  logout: () => void;
};

const USERS_KEY = "carexyz_users";
const SESSION_KEY = "carexyz_session";

const AuthContext = createContext<AuthContextShape | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const match = users.find(
      (u) =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password,
    );
    if (!match) {
      throw new Error("Invalid email or password.");
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(match));
    setUser(match);
    return match;
  }, []);

  const register = useCallback(async (newUser: User) => {
    const users: User[] = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
    const exists = users.some(
      (u) => u.email.toLowerCase() === newUser.email.trim().toLowerCase(),
    );
    if (exists) {
      throw new Error("An account with this email already exists.");
    }
    const nextUser = { ...newUser, email: newUser.email.trim() };
    const updated = [...users, nextUser];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    localStorage.setItem(SESSION_KEY, JSON.stringify(nextUser));
    setUser(nextUser);
    return nextUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

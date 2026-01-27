"use client";

import { createContext, ReactNode, useState, useEffect } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/navigation';
import { api } from '../api';


type User = {
  id: number;
  name: string;
  email: string;
  role?: string;     
  isAdmin?: boolean; 
}

type SignInData = {
  email: string;
  password: string;
}

type AuthContextData = {
  user: User | undefined;
  isAuthenticated: boolean;
  signIn: (credentials: SignInData) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>();
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    const { '@nextauth.token': token } = parseCookies();

    if (token) {
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

      api.get('/me').then(response => {
        setUser(response.data);
      }).catch(() => {
        signOut();
      })
    }
  }, []);

  async function signIn({ email, password }: SignInData) {
    try {
      
      const response = await api.post('/login', {
        email,
        password
      });

      
      const { token, user } = response.data;

      setCookie(undefined, '@nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30, 
        path: '/'
      });

      setUser(user);
      api.defaults.headers['Authorization'] = `Bearer ${token}`;

    
      if (user.isAdmin === true || user.role === 'ADMIN' || user.role === 'admin') {
        console.log("Usuário é Admin, indo para o painel Admin...");
        router.push('/dashboard/admin');
      } else {
        console.log("Usuário é Cliente, indo para o painel Cliente...");
        router.push('/dashboard/client');
      }

    } catch (err) {
      console.log("Erro ao logar", err);
      alert("Erro ao fazer login. Verifique email e senha.");
    }
  }

  function signOut() {
    destroyCookie(undefined, '@nextauth.token');
    setUser(undefined);
    router.push('/');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
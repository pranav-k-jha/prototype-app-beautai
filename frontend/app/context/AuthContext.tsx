import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as AuthSession from "expo-auth-session";
import axios from "axios";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = process.env.JWT_SECRTET;
export const API_URL = "hhttp://localhost:3000/graphql";
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null,
  });

  const register = async (name: string, password: string) => {
    try {
      return await axios.post(`${API_URL}/users`, { name, password });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const login = async (name: string, password: string) => {
    try {
      const result = await axios.post(`${API_URL}/auth`, { name, password });

      console.log("🚀 ~ file: AuthContext.tsx:41 ~ login ~ result:", result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
      });
    } catch (e) {
      return { error: true, msg: (e as any).response.data.msg };
    }
  };

  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

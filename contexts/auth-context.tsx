"use client";

import { createContext, ReactNode, useState, useContext } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { API } from "@/services/api";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface User {
  admin: {
    id: number;
    super_admin_id: number;
    name: string;
    phone_number: string;
    email: string;
    password: string;
    created_at: null;
    updated_at: null;
  };
  token: string;
}

interface CredentialType {
  email: string;
  password: string;
}

interface ChildrenPropsType {
  children: ReactNode;
}

interface AuthContextData {
  user: User | null;
  signIn: (credentials: CredentialType) => Promise<void>;
  signOut: () => void;
}

function AuthProvider({ children }: ChildrenPropsType) {
  const [data, setData] = useState<User | null>(() => {
    if (typeof window !== "undefined") {
      const storagedUser = localStorage.getItem("@linkFinancer:user");
      return storagedUser ? JSON.parse(storagedUser) : null;
    }
    return null;
  });

  const router = useRouter();

  async function signIn({ email, password }: CredentialType) {
    try {
      const response = await API.post("/sessions", {
        email,
        password,
      });

      const { token, admin } = response.data;
      const user = { admin, token };

      localStorage.setItem("@linkFinancer:user", JSON.stringify(user));
      localStorage.setItem("@LinkFinancer:token", token);

      setData(user);

      router.push("/admin");
      toast("Login executado com sucesso", {
        description: `Bem-Vindo(a) de volta, ${admin.name}`,
      });
    } catch (error: any) {
      console.error("Erro no login", error);
      if (error.response) {
        toast.error(
          `Erro: ${error.response.data.error || "Credenciais invalidas."}`
        );
      }
    }
  }

  function signOut() {
    localStorage.removeItem("@LinkFinancer:user");
    localStorage.removeItem("@LinkFinancer:token");
    setData(null);
    router.push("/login");
    toast("Logout realizado com sucesso");
  }
  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };

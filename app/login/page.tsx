"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { User } from "@/types/user";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Validate credentials
      const isAdmin = email === 'davi@admin.com' && password === '123456';
      const isClient = email === 'cliente@gmail.com' && password === '123456';
      
      if (!isAdmin && !isClient) {
        throw new Error('E-mail ou senha incorretos');
      }
      
      // Create user object based on credentials
      const mockUser: User = {
        id: isAdmin ? 'admin-1' : 'client-1',
        name: isAdmin ? 'Davi Admin' : 'Cliente',
        email,
        role: isAdmin ? 'admin' : 'client',
        avatar: `https://ui-avatars.com/api/?name=${isAdmin ? 'DA' : 'CL'}&background=random`,
        phone: "(11) 91234-5678"
      };

      login(mockUser);
      
      // Redirect based on role
      const redirectPath = isAdmin ? '/admin' : '/client';
      router.push(redirectPath);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao fazer login');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-[#15192f] via-[#223347] via-55% to-[#3c5674] overflow-hidden">
      {/* Logo */}
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-32 h-auto mb-2 drop-shadow-md rounded-3xl"
      />

      {/* Login Form */}
      <motion.div
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-lg z-10"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <div className="w-full">
          <h1 className="text-2xl font-bold text-white text-center mb-8">Acesse sua conta</h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-100 rounded-md text-sm">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="seu@email.com"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Senha
                </label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                isLoading
                  ? 'bg-primary/70 cursor-not-allowed'
                  : 'bg-primary hover:bg-primary/90'
              }`}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-white/70">
            <p>Não tem uma conta?{' '}
              <a href="/register" className="text-primary hover:underline">
                Cadastre-se
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

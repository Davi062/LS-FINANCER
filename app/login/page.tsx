"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'client';
};

export default function LoginPage() {
  const [flipped, setFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (flipped) return;
    
    setIsLoading(true);
    setError("");

    try {
      // Validação das credenciais
      if (email === 'admin@admin.com' && senha === '123456') {
        const adminUser: User = {
          id: '1',
          name: 'Administrador',
          email: 'admin@admin.com',
          role: 'admin'
        };
        
        login(adminUser);
        setFlipped(true);
        
        setTimeout(() => {
          router.push('/admin');
        }, 1000);
        
      } else if (email === 'client@gmail.com' && senha === '123456') {
        const clientUser: User = {
          id: '2',
          name: 'Cliente',
          email: 'client@gmail.com',
          role: 'client'
        };
        
        login(clientUser);
        setFlipped(true);
        
        setTimeout(() => {
          router.push('/client');
        }, 1000);
        
      } else {
        throw new Error('Credenciais inválidas');
      }
      
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
      console.error("Erro no login:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-[#15192f] via-[#223347] via-55% to-[#3c5674] overflow-hidden">

      {/* ✅ Logo centralizada acima do form */}
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-32 h-auto mb-2 drop-shadow-md rounded-3xl"
      />

      {/* Cartão principal */}
      <motion.div
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-lg z-10"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <motion.div
          className="relative w-full h-[360px] transition-transform duration-700 ease-in-out"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.8 }}
          style={{ transformStyle: "preserve-3d", perspective: 1000 }}
        >
          {/* Frente */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 w-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow">
              Faça seu login
            </h1>

            <form className="w-full space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-white/60 bg-white/20 text-white placeholder-white rounded"
              />
              <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full p-2 border border-white/60 bg-white/20 text-white placeholder-white rounded"
              />
              <button
                type="submit"
                className="w-2/6 max-w-xs mx-auto bg-[#223347] hover:bg-[#3c5674] text-white font-semibold rounded p-2 transition-transform duration-200 ease-in-out active:scale-90"
              >
                Logar
              </button>
            </form>
          </div>

          {/* Verso */}
          <div
            className="absolute inset-0 flex items-center justify-center bg-white/20 text-white text-xl font-semibold rounded-lg"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <AnimatePresence>
              {flipped && (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  ✅ Login realizado com sucesso!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

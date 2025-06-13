"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { Eye, EyeOff } from "lucide-react";

export default function Page() {
  const [flipped, setFlipped] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [touched, setTouched] = useState(false);

  const router = useRouter();
  const { login } = useAuth();

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    if (flipped || isLoading) return;

    // Só marca campos como tocados se estiverem vazios
    if (!email || !senha) {
      setTouched(true);
      return;
    }

    setTouched(false);
    setIsLoading(true);
    setLoginError(false);

    let userData = null;

    if (email === "admin@admin.com" && senha === "123456") {
      userData = {
        id: "1",
        name: "Administrador",
        email: "admin@admin.com",
        role: "admin" as const,
        avatar: "/avatars/admin.jpg",
      };
    } else if (email === "cliente@gmail.com" && senha === "123456") {
      userData = {
        id: "2",
        name: "Cliente",
        email: "cliente@exemplo.com",
        role: "client" as const,
        avatar: "/avatars/client.jpg",
      };
    }

    if (userData) {
      login(userData);
      setFlipped(true);
      setLoggedIn(true);

      setTimeout(() => {
        const redirectPath = userData.role === "admin" ? "/admin" : "/client";
        router.push(redirectPath);
      }, 1500);
    } else {
      setLoginError(true);
      setIsLoading(false);
      setEmail("");
      setSenha("");

      if (typeof window !== "undefined" && "vibrate" in navigator) {
        navigator.vibrate(200);
      }

      setTimeout(() => setLoginError(false), 1000);
    }
  }

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center gap-6 bg-gradient-to-t from-[#15192f] via-[#223347] via-55% to-[#3c5674] overflow-hidden">
      <img
        src="/logo.svg"
        alt="Logo"
        className="w-32 h-auto mb-2 drop-shadow-md rounded-3xl"
      />

      <motion.div
        className="relative w-full max-w-md p-8 rounded-3xl bg-white/10 backdrop-blur-md shadow-lg z-10"
        whileHover={{ scale: 1.05 }}
        animate={loginError ? { x: [-10, 10, -5, 5, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="relative w-full h-[400px] transition-transform duration-700 ease-in-out"
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

            <form onSubmit={handleClick} className="flex flex-col gap-4 w-5/6">
              {/* Email */}
              <div className="flex flex-col gap-1">
                <input
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-2 border rounded bg-white/20 text-white placeholder-white ${
                    touched && !email ? "border-red-400" : "border-white/60"
                  }`}
                />
                {touched && !email && (
                  <span className="text-red-300 text-xs pl-1 -mt-1">
                    Campo obrigatório
                  </span>
                )}
              </div>

              {/* Senha */}
              <div className="flex flex-col gap-1 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className={`w-full p-2 pr-10 border rounded bg-white/20 text-white placeholder-white ${
                    touched && !senha ? "border-red-400" : "border-white/60"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {touched && !senha && (
                  <span className="text-red-300 text-xs pl-1 -mt-1">
                    Campo obrigatório
                  </span>
                )}
              </div>

              {/* Botão */}
              <button
                type="submit"
                className="w-2/6 max-w-xs mx-auto bg-[#223347] hover:bg-[#3c5674] text-white font-semibold rounded p-2 transition-transform duration-200 ease-in-out active:scale-90"
              >
                {isLoading ? "Entrando..." : "Logar"}
              </button>

              {/* Erro login */}
              <AnimatePresence>
                {loginError && (
                  <motion.p
                    className="text-red-300 text-center text-sm"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    ❌ Credenciais inválidas!
                  </motion.p>
                )}
              </AnimatePresence>
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
              {loggedIn && (
                <motion.div
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

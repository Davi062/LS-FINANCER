"use client";

import { useState } from "react";

export default function Page() {
  const [flipped, setFlipped] = useState(false);

  function handleClick(e: React.FormEvent) {
    e.preventDefault();
    if (flipped) return;
    setFlipped(true);
    setTimeout(() => setFlipped(false), 1000);
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center
                 bg-[radial-gradient(ellipse_at_50%_75%,#0c1a4f,#60a5fa,#0c1a4f_78%)]"
    >
      <div
        className={`relative w-full max-w-md p-8 rounded-lg bg-white/10 backdrop-blur-md shadow-md
                    flex flex-col items-center gap-6
                    transition-transform duration-500 ease-in-out
                    hover:scale-105`}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Frente do formulário */}
        <div
          style={{ backfaceVisibility: "hidden" }}
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Frase que aparece só no hover */}
          <h1
            className="text-2xl font-bold text-white
                       opacity-0 transition-opacity duration-300 ease-in-out
                       hover:opacity-100"
            style={{ pointerEvents: "none" }}
          >
            Faça seu Login
          </h1>

          <form onSubmit={handleClick} className="flex flex-col gap-4 w-full">
            <input
              type="text"
              placeholder="Email"
              className="w-full p-2 border border-white/30 bg-white/20 text-white placeholder-white rounded"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full p-2 border border-white/30 bg-white/20 text-white placeholder-white rounded"
            />
            <button
              type="submit"
              className="w-5/6 max-w-xs mx-auto bg-sky-500 hover:bg-sky-700 text-white font-semibold rounded p-2
                         transition-transform duration-200 ease-in-out active:scale-90"
            >
              Logar
            </button>
          </form>
        </div>

        {/* Verso vazio */}
        <div
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 bg-transparent"
        />
      </div>
    </div>
  );
}

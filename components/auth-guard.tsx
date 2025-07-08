"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';
import { useEffect } from 'react';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return; // Aguarda o carregamento inicial

    // Se não estiver logado e não estiver na página de login, redireciona para o login
    if (!user && pathname !== '/login') {
      router.push('/login');
      return;
    }

    // Se estiver logado e na página de login, redireciona com base no papel do usuário
    if (user && pathname === '/login') {
      const redirectPath = user.role === 'admin' ? '/admin' : '/client';
      router.push(redirectPath);
    }
  }, [user, pathname, router]);

  // Mostra um loading enquanto verifica a autenticação
  if ((!user && pathname !== '/login')) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}

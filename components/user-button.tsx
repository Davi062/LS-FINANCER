"use client"

import { LogOut, Settings } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useAuth } from "@/hooks/auth"

interface UserButtonProps {
  name: string
  email: string
  avatar?: string
}

export function UserButton({ name, email, avatar }: UserButtonProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userData, setUserData] = useState({ name, email, avatar })
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)
  const router = useRouter()
  const menuRef = useRef<HTMLDivElement>(null)

  // Atualizar dados do usuário do localStorage quando o componente montar
  useEffect(() => {
    try {
      const userDataStr = localStorage.getItem("@linkCallendar:user")
      if (userDataStr) {
        const parsedData = JSON.parse(userDataStr)
        setUserData({
          name: parsedData.name || name,
          email: parsedData.email || email,
          avatar: parsedData.avatar || avatar
        })
        
        // Buscar a foto de perfil após carregar os dados do usuário
      }
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error)
    }
  }, [name, email, avatar])

  // Função para buscar a foto de perfil do usuário
  const fetchProfilePhoto = async () => {
    try {
      const token = localStorage.getItem("@linkCallendar:token")
      const userData = JSON.parse(localStorage.getItem("@linkCallendar:user") || "{}")
      
      if (!token || !userData.id) return
      
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3131'}/team-photos/${userData.id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'company_id': useAuth().user?.company_id
        }
      })
      
      if (response.data && response.data.photo_url) {
        setProfilePhoto(response.data.photo_url)
      }
    } catch (error) {
      console.error("Erro ao buscar foto de perfil:", error)
      // Não mostrar erro para o usuário, apenas usar o avatar padrão
    }
  }

  const handleLogout = () => {
    // Remover dados do localStorage
    localStorage.removeItem("@linkCallendar:user")
    localStorage.removeItem("@linkCallendar:token")
    
    // Redirecionar para a página de login
    router.push("/Login")
  }

  // Fechar o menu quando clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Obter as iniciais do nome para exibir no avatar
  const getInitials = () => {
    if (!userData.name) return "U"
    return userData.name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        className="flex items-center gap-3 px-3 py-1.5 rounded-lg transition-colors text-white/70 text-sm"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {profilePhoto ? (
          <img src={profilePhoto} alt="Avatar" className="w-7 h-7 rounded-full object-cover object-center" />
        ) : userData.avatar ? (
          <img src={userData.avatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover object-center" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#ffffff] flex items-center justify-center text-sm font-medium text-black">
            {getInitials()}
          </div>
        )}
        <span>{userData.name}</span>
      </button>
      
      {isMenuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 p-2 bg-[#236F5D] rounded-lg shadow-lg border border-white/10 z-50">
          <div className="text-xs text-white mb-2">{userData.email}</div>
          <div className="h-[1px] bg-white/20 my-2"></div>
          <div 
            role="button"
            tabIndex={0}
            onClick={() => {
              router.push("/profile");
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded transition-colors flex items-center gap-2 cursor-pointer text-white"
          >
            <Settings className="w-4 h-4" />
            <span>Configurações</span>
          </div>
          <div 
            role="button"
            tabIndex={0}
            onClick={handleLogout}
            className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded transition-colors flex items-center gap-2 cursor-pointer text-red-300"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </div>
        </div>
      )}
    </div>
  )
}

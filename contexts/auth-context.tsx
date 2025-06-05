"use client"

import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { User, UserRole } from "@/types/user"

interface AuthContextType {
  user: User | null
  role: UserRole
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUser = () => {
      try {
        // Check if user is in localStorage (set during login)
        const storedUser = localStorage.getItem('@linkCallendar:user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          setUser(userData)
        }
      } catch (error) {
        console.error('Failed to load user from localStorage', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = useCallback((userData: User) => {
    try {
      // Save user data to localStorage
      localStorage.setItem('@linkCallendar:user', JSON.stringify(userData))
      setUser(userData)
    } catch (error) {
      console.error('Failed to save user data:', error)
    }
  }, [])

  const logout = useCallback(() => {
    try {
      // Remove user data from localStorage
      localStorage.removeItem('@linkCallendar:user')
      setUser(null)
      // Redirect to login page after logout
      router.push('/login')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  }, [router])

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

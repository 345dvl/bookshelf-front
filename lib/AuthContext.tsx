import type { User } from "firebase/auth"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { app } from "./firebase"

export type UserType = User | null

export type AuthContextProps = {
  user: UserType
}

export type AuthProps = {
  children: ReactNode
}

const AuthContext = createContext<Partial<AuthContextProps>>({})

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }: AuthProps) => {
  const router = useRouter()
  const auth = getAuth(app)
  const [user, setUser] = useState<UserType>(null)
  const isAvailableForViewing =
    router.pathname === "/signin" ||
    router.pathname === "/signup"
  const value = {
    user,
  }

  useEffect(() => {
    const authStateChanged = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      !user && !isAvailableForViewing && (await router.push("./"))
    })
    return () => {
      authStateChanged()
    }
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * AUTH CONTEXT
 * 
 * Maneja la autenticación en toda la aplicación.
 * Provee: usuario logueado, token, funciones login/logout
 */

import { createContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { User, LoginInput, AuthResponse } from '@/types'
import { authApi } from '@/api'

// ============================================================
// 1. DEFINIR EL TIPO DEL CONTEXTO
// ============================================================

/**
 * Define QUÉ datos y funciones compartirá el contexto
 */
interface AuthContextType {
  // Estado
  user: User | null              // Usuario logueado (null si no hay sesión)
  token: string | null           // Token JWT (null si no hay sesión)
  isAuthenticated: boolean       // true si hay usuario logueado
  isLoading: boolean             // true mientras verifica la sesión

  // Funciones
  login: (credentials: LoginInput) => Promise<void>
  logout: () => void
}

// ============================================================
// 2. CREAR EL CONTEXT
// ============================================================

/**
 * Crear el contexto con valor undefined por defecto
 * undefined = no hay Provider (error de desarrollo)
 */
export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ============================================================
// 3. CREAR EL PROVIDER
// ============================================================

/**
 * Props del AuthProvider
 * children = todos los componentes que envuelve
 */
interface AuthProviderProps {
  children: ReactNode
}

/**
 * AuthProvider
 * 
 * Este componente:
 * 1. Guarda el usuario y token en estado
 * 2. Persiste la sesión en localStorage
 * 3. Provee funciones login/logout
 * 4. Comparte todo con los componentes hijos
 */
export function AuthProvider({ children }: AuthProviderProps) {
  
  // ============================================================
  // ESTADO LOCAL
  // ============================================================
  
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)  // Inicia en true

  // ============================================================
  // EFECTO: RESTAURAR SESIÓN AL CARGAR
  // ============================================================
  
  /**
   * useEffect se ejecuta cuando el componente se monta
   * Aquí verificamos si hay una sesión guardada en localStorage
   */
  useEffect(() => {
    // Función para restaurar sesión guardada
    const restoreSession = () => {
      try {
        // Intentar obtener token del localStorage
        const storedToken = localStorage.getItem('authToken')
        
        // Intentar obtener usuario del localStorage
        const storedUser = localStorage.getItem('user')

        // Si hay token Y usuario guardados
        if (storedToken && storedUser) {
          // Restaurar en el estado
          setToken(storedToken)
          setUser(JSON.parse(storedUser))  // Convertir string JSON a objeto
          
          console.log('✅ Sesión restaurada desde localStorage')
        } else {
          console.log('ℹ️ No hay sesión guardada')
        }
      } catch (error) {
        // Si hay error al parsear el JSON, limpiar todo
        console.error('❌ Error al restaurar sesión:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('user')
      } finally {
        // Siempre marcar como "no cargando"
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])  // [] = solo se ejecuta una vez al montar

  // ============================================================
  // FUNCIÓN: LOGIN
  // ============================================================
  
  /**
   * Función para iniciar sesión
   * 
   * 1. Llama a la API con email y password
   * 2. Si es exitoso, guarda token y usuario
   * 3. Persiste en localStorage
   */
  const login = async (credentials: LoginInput) => {
    try {
      // Llamar a la API de login
      const response: AuthResponse = await authApi.login(credentials)

      // 🔍 DEBUG: Ver qué responde la API
      console.log('🔍 Respuesta completa de la API:', response)

      // Extraer token de la ubicación correcta (según tu API)
      const authToken = response.data.access.token
      console.log('🔍 Token extraído:', authToken)

      // Guardar token en el estado
      setToken(authToken)
      console.log('✅ Token guardado en estado')

      // Persistir token en localStorage
      localStorage.setItem('authToken', authToken)
      console.log('✅ Token guardado en localStorage')

      // TODO: Obtener datos del usuario
      // Tu API no devuelve el usuario en el login
      // Necesitarás hacer otra petición para obtenerlo
      // Por ahora, creamos un usuario temporal con el email
      const tempUser: User = {
        id: 'temp',
        name: credentials.email.split('@')[0], // Usa la parte antes del @
        email: credentials.email,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deleted: false,
      }

      setUser(tempUser)
      localStorage.setItem('user', JSON.stringify(tempUser))
      console.log('✅ Usuario temporal creado:', tempUser)

      console.log('✅ Login exitoso - proceso completo')
    } catch (error: any) {
      // Si hay error, limpiar todo
      console.error('❌ Error en login:', error)
      
      // Re-lanzar el error para que el componente pueda manejarlo
      throw error
    }
  }

  // ============================================================
  // FUNCIÓN: LOGOUT
  // ============================================================
  
  /**
   * Función para cerrar sesión
   * 
   * 1. Llama a la API de logout (opcional)
   * 2. Limpia el estado
   * 3. Limpia localStorage
   */
  const logout = () => {
    try {
      // Intentar llamar a la API de logout
      // No esperamos la respuesta (fire and forget)
      authApi.logout().catch((error) => {
        console.error('Error al hacer logout en el servidor:', error)
      })
    } catch (error) {
      console.error('Error en logout:', error)
    } finally {
      // Limpiar estado local
      setUser(null)
      setToken(null)

      // Limpiar localStorage
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')

      console.log('✅ Sesión cerrada')
    }
  }

  // ============================================================
  // VALOR A COMPARTIR
  // ============================================================
  
  /**
   * Este objeto es lo que compartimos con todos los componentes
   * Cualquier componente hijo puede acceder a esto con useAuth()
   */
  const value: AuthContextType = {
    // Estado
    user,
    token,
    isAuthenticated: !!user && !!token,  // !! convierte a boolean
    isLoading,

    // Funciones
    login,
    logout,
  }

  // ============================================================
  // RENDERIZAR PROVIDER
  // ============================================================
  
  /**
   * El Provider envuelve a los hijos y les da acceso al value
   */
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

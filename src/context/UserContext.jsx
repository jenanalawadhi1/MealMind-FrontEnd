import { createContext, useState } from 'react'

export const AuthContext = createContext()

// useContext for user
// https://www.telerik.com/blogs/react-basics-how-when-use-react-context#:~:text=Context%2C%20in%20React%2C%20is%20a%20way%20to%20pass%20data%20down,e.g.%2C%20between%20sibling%20components).
export const UserProvider = ({ children }) => {
  const [user, setUSer] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    // Authenticate user and set user information and authentication status
    setUser(userData)
    setIsAuthenticated(true)
  }

  const logout = () => {
    // Remove user information and set authentication status to false
    setUser(null)
    setIsAuthenticated(false)
  }
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

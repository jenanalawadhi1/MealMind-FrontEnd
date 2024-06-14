import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'
import Home from './pages/Home'
import ShowPlan from './pages/ShowPlan'
import StartPlan from './pages/StartPlan'

const App = () => {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    // Check if token exists before requesting to validate the token
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans/:id" element={<ShowPlan />} />
          <Route path="/plans/new" element={<StartPlan />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

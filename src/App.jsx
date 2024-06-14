import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import Home from './pages/Home'
import ShowPlan from './pages/ShowPlan'
import StartPlan from './pages/StartPlan'
import ViewPost from './components/ViewPost'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'

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
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewpost" element={<ViewPost />} />
          <Route path="/plans/:id" element={<ShowPlan />} />
          <Route path="/plans/new" element={<StartPlan user={user} />} />
          <Route path="/posts/:id" element={<ViewPost />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

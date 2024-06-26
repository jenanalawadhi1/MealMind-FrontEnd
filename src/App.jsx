import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { CheckSession } from './services/Auth'
import About from './pages/About'
import Home from './pages/Home'
import ShowPlan from './pages/ShowPlan'
import StartPlan from './pages/StartPlan'
import MyPlans from './pages/MyPlans'
import ViewPost from './components/ViewPost'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
  const [user, setUser] = useState(null)
  const [theme, setTheme] = useState('light')

  const toggleTheme = () =>{
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

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
    <div className={theme}>
      <Nav user={user} handleLogOut={handleLogOut} theme={theme} toggleTheme={toggleTheme}/>
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans" element={<MyPlans user={user} />} />
          <Route path="/plans/:id" element={<ShowPlan user={user} />} />
          <Route path="/plans/new" element={<StartPlan user={user}/>} />
          <Route path="/posts/:id" element={<ViewPost user={user}/>} />
        </Routes>
      </main>
    </div>
  )
}

export default App

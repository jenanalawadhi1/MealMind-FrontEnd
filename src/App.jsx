import { Route, Routes } from 'react-router-dom'

import About from './pages/About'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'
import Home from './pages/Home'
import ShowPlan from './pages/ShowPlan'
import StartPlan from './pages/StartPlan'

import MyPlans from './pages/MyPlans'


const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <Nav user={user} handleLogOut={handleLogOut} />
      <ShowPlan />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home user={user}/>} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans/:id" element={<ShowPlan />} />
          <Route path="/plans/new" element={<StartPlan />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

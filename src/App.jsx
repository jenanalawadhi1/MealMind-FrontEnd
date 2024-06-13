import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Nav from './components/Nav'
import Login from './components/Login'
import Register from './components/Register'
import './App.css'
import Home from './pages/Home'
import ShowPlan from './pages/ShowPlan'
import MyPlans from './pages/MyPlans'

const App = () => {
  return (
    <div>
      <Nav />
      <ShowPlan/>
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/plans/:id" element={<ShowPlan />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

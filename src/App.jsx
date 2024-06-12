import { Route, Routes } from 'react-router-dom'
import About from './pages/About'
import Nav from './components/Nav'
import './App.css'

const App = () => {
  return (
    <div>
      <Nav />
      <main>
        <Routes>
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

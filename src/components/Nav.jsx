import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
    </header>
  )
}

export default Nav

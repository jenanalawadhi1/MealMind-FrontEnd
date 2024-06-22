import { NavLink, Link } from 'react-router-dom'
import { FiSun, FiMoon } from 'react-icons/fi'

const Nav = ({ user, handleLogOut, theme, toggleTheme }) => {
  return (
    <header>
      <NavLink to="/">
        <img
          className="logo-img"
          alt="logo"
          src="https://www12.0zz0.com/2024/06/20/08/156194360.png"
        />
      </NavLink>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/about" end>
          About
        </NavLink>
        {user ? (
          <>
            <NavLink to="/plans/new" end>
              Start Plan
            </NavLink>
            <NavLink to="/plans" end>
              My Plans
            </NavLink>
          </>
        ) : (
          <Link to="/login" end>
            Start Plan
          </Link>
        )}
      </div>

      {user ? (
        <div className="nav-links">
          <Link id="logout" onClick={handleLogOut} to="/">
            <span>Welcome {user.firstName}</span>
          </Link>
          <div className='theme-icon' onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <NavLink id="register" to="/register" end>
            Register
          </NavLink>
          <NavLink id="login" to="/login" end>
            Login
          </NavLink>
          <div className='theme-icon' onClick={toggleTheme}>
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </div>
        </div>
      )}
    </header>
  )
}

export default Nav

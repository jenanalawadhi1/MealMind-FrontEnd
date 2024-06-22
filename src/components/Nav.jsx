import { NavLink, Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
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
          <Link id='logout' onClick={handleLogOut} to="/">
          <span id="welcoming">Welcome {user.firstName}</span>
          </Link>
        </div>
      ) : (
        <div className="nav-links">
          <NavLink id="register" to="/register" end>
            Register
          </NavLink>
          <NavLink id="login" to="/login" end>
            Login
          </NavLink>
        </div>
      )}
    </header>
  )
}

export default Nav

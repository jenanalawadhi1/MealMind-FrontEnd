import { NavLink, Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  return (
    <header>
      <NavLink to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </NavLink>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about" end>About</NavLink>
        {user ? (
          <>
            <NavLink to="/plans/new" end>Start Plan</NavLink>
            <NavLink to="/plans" end>My Plans</NavLink>
            <Link onClick={handleLogOut} to="/" end>
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" end>Start Plan</Link>
            <NavLink id="register" to="/register" end>
              Register
            </NavLink>
            <NavLink id="login" to="/login" end>
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav

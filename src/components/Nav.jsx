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
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        {user ? (
          <>
            <NavLink to="/plans/new">Start Plan</NavLink>
            <NavLink to="/plans">My Plans</NavLink>
            <Link onClick={handleLogOut} to="/">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Start Plan</Link>
            <NavLink id="register" to="/register">
              Register
            </NavLink>
            <NavLink id="login" to="/login">
              Login
            </NavLink>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav

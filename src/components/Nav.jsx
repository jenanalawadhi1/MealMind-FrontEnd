import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {user ? (
          <>
            <Link to="/plans/new">Start Plan</Link>
            <Link to="/plans">MyPlans</Link>
            <Link onClick={handleLogOut} to="/">
              Log Out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login">Start Plan</Link>
            <Link id="register" to="/register">
              Register
            </Link>
            <Link id="login" to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </header>
  )
}

export default Nav

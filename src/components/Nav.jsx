import { Link } from 'react-router-dom'

const Nav = ({ user, handleLogOut }) => {
  let userOptions
  if (user) {
    userOptions = (
      <nav className='loginNav'>
        <h3>
          Welcome {user.firstName} {user.lastName}!
        </h3>
        <Link to="/posts">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/plans/new">Start Plan</Link>
        <Link to="/plans">MyPlans</Link>
        <Link onClick={handleLogOut} to="/">
          Log Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav className='logoutNav'>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/login">Start Plan</Link>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
          <img
            // className="logo"
            // src="https://avatars.dicebear.com/api/gridy/app.svg"
            // alt="welcome banner"
          />
        </div>
      </Link>
      {user ? userOptions : publicOptions}
    </header>
  )
}

export default Nav
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LoginUser } from '../services/Auth'

const Login = ({ setUser }) => {
  let navigate = useNavigate()

  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = await LoginUser(formValues)
      setFormValues({ email: '', password: '' })
      setUser(payload)
      navigate('/')
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setErrorMessage(
          'Incorrect email or password. Please check your credentials and try again.'
        )
      } else {
        setErrorMessage('An error occurred. Please try again later.')
      }
    }
  }

  return (
    <div className="login col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              required
            />
          </div>
          <button
            className="button"
            disabled={!formValues.email || !formValues.password}
          >
            Login
          </button>
          {errorMessage && <p className="validation-message">{errorMessage}</p>}
        </form>
      </div>
      <div>
        <p id="haveAccount">
          Don’t have an account?{' '}
          <Link id="loginAccount" to="/register">
            Register
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Login

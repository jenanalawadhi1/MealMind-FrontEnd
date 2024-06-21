// Will show the user registeriation
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [validity, setValidity] = useState('')

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    if (formValues.password.length < 7) {
      setValidity('Password Must Contain At Least 8 Charcters .')
    } else {
      setValidity('')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { password, confirmPassword, email, firstName, lastName } = formValues

    if (!password || !confirmPassword || !email || !firstName || !lastName) {
      setValidity('Fill In Your Deatails Please.')
      return
    }

    if (password !== confirmPassword) {
      setValidity('Passwords Not Matching.')
      setFormValues((prevValues) => ({
        ...prevValues,
        password: '',
        confirmPassword: ''
      }))
      return
    }

    if (password.length < 8) {
      setValidity('Password Must Contain At Least 8 Charcters .')
      return
    }

    try {
      await RegisterUser({ firstName, lastName, email, password })
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
      navigate('/login')
    } catch (error) {
      setValidity('Registration Failed')
      console.error('Registration failed:', error)
    }
  }

  return (
    <div className="login col">
      <div className="card-overlay centered">
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="firstName"> First Name</label>
            <input
              onChange={handleChange}
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formValues.firstName}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="lastName">Last Name</label>
            <input
              onChange={handleChange}
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formValues.lastName}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@gmail.com"
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
          <div className="input-wrapper">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Register
          </button>
          <p className="validation-message">{validity}</p>
        </form>
      </div>
      <div>
        <p id="haveAccount">
          Alraedy have an account?{' '}
          <Link id="loginAccount" to="/login">
            Log In
          </Link>{' '}
        </p>
      </div>
    </div>
  )
}

export default Register

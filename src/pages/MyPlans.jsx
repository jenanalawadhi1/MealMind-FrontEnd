// view plans
import { useNavigate, Link } from 'react-router-dom'

const MyPlans = () => {
  const plans = [
    { planName: 'Weight Loss Program', id: '66696a2ec18241628dd19f77' },
    { planName: 'Muscles gain Program', id: '2' },
    { planName: 'Diet Program', id: '3' }
  ]

  return (
    <div className="feed">
      {plans.map((plan) => (
        <div key={plan.id}>
          <h3>{plan.planName}</h3>
          <Link to={`${plan.id}`}>
            <div className="button">Read More</div>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default MyPlans

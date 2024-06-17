import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetMyPlans } from '../services/MealPlanServices'

const MyPlans = ({ user }) => {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const getUserPlans = async () => {
      try {
        if (user) {
          const plans = await GetMyPlans(user._id)
          setPlans(plans)
        }
      } catch (error) {
        console.error('Error fetching meal plans:', error)
      }
    }

    getUserPlans()
  }, [user])

  return (
    <div className="feed">
      {plans.length === 0 ? (
        <div>
          <p>No Plans Yet! Start a new meal plan</p>
          <Link to="/plans/new">
            <div className="button">Create New Plan</div>
          </Link>
        </div>
      ) : (
        plans.map((plan) => (
          <div key={plan._id}>
            <h3>{plan.planName}</h3>
            <Link to={`/plans/${plan._id}`}>
              <div className="button">Read More</div>
            </Link>
          </div>
        ))
      )}
    </div>
  )
}

export default MyPlans

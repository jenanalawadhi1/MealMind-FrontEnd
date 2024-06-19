import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetMyPlans } from '../services/MealPlanServices'
import Plan from '../components/Plan'

const MyPlans = ({ user }) => {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const getUserPlans = async () => {
      try {
        if (user) {
          const plans = await GetMyPlans(user.id)
          setPlans(plans)
        }
      } catch (error) {
        console.error('Error getting user plans:', error)
      }
    }

    getUserPlans()
  }, [user])

  const removePlan = (planId) => {
    setPlans(plans.filter((plan) => plan._id !== planId))
  }

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
          <Plan key={plan._id} plan={plan} onDelete={removePlan} />
        ))
      )}
    </div>
  )
}

export default MyPlans

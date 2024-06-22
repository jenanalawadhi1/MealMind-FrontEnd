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
    <>
      {plans.length === 0 ? (

        <div className="no-plans">
          <div>
          <p id="startPlan">No Plans Yet! Start a new meal plan</p>
            <Link to="/plans/new">
              <div className="button">Create New Plan</div>
            </Link>
          </div>
          <img
            src="../../images/Eating healthy food-pana.svg"
            alt="Girl Eating Healthy Food"
          />

        </div>
      ) : (
        <div className="feed">
          {plans.map((plan) => (
            <Plan key={plan._id} plan={plan} onDelete={removePlan} />
          ))}
        </div>
      )}
    </>
  )
}

export default MyPlans

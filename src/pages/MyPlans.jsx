import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetMyPlans } from '../services/MealPlanServices'
// import mealPlanImg from '../../mealPlanImages'
import Plan from '../components/Plan'

// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = (Math.floor(Math.random() * (i + 1))[(array[i], array[j])] = [
//       array[j],
//       array[i]
//     ])
//   }
//   return array
// }

const MyPlans = ({ user }) => {
  const [plans, setPlans] = useState([])
  // const [images, setImages] = useState([])

  useEffect(() => {
    const getUserPlans = async () => {
      try {
        if (user) {
          const plans = await GetMyPlans(user.id)
          setPlans(plans)
          setImages(shuffleArray([...mealPlanImg]))
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
          <Plan
            key={plan._id}
            plan={plan}
            onDelete={removePlan}
            // image={images[index]}
          />
        ))
      )}
    </div>
  )
}

export default MyPlans

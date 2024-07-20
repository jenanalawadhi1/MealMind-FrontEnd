import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetMyPlans } from '../services/MealPlanServices'
import mealPlanImages from '../mealPlanImages'
import Plan from '../components/Plan'

const MyPlans = ({ user }) => {
  const [plans, setPlans] = useState([])
  const [images, setImages] = useState([])

  const uploadRandomImg = (length) => {
    let arr = [...images]
    for (let i = 0; i < length; i++) {
      let randIdx = Math.floor(Math.random() * mealPlanImages.length)
      if (!arr.includes(mealPlanImages[randIdx])) {
        arr.push(mealPlanImages[randIdx])
      }
    }
    setImages(arr)
  }

  useEffect(() => {
    const getUserPlans = async () => {
      try {
        if (user) {
          const plans = await GetMyPlans(user.id)
          setPlans(plans)
          uploadRandomImg(plans.length)
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
            src="https://www12.0zz0.com/2024/06/23/06/812786570.png"
            alt="Girl Eating Healthy Food"
          />
        </div>
      ) : (
        <div className="feed">
          {plans.map((plan, index) => (
            <Plan
              key={plan._id}
              plan={plan}
              onDelete={removePlan}
              image={images[index]}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default MyPlans

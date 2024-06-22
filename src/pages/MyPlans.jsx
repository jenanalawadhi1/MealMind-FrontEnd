import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetMyPlans } from '../services/MealPlanServices'
import planImages from '../mealPlanImages'
import Plan from '../components/Plan'

const MyPlans = ({ user }) => {
  const [plans, setPlans] = useState([])
  const [images, setImages] = useState([])

  const uploadRandomImg = (length) => {
    let arr = [...images]
    for (let i = 0; i < length; i++) {
      let randIdx = Math.floor(Math.random() * planImages.length)
      if (!arr.includes(planImages[randIdx])) {
        arr.push(planImages[randIdx])
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
    <div className="feed">
      {plans.length === 0 ? (
        <div>
          <p id="startPlan">No Plans Yet! Start a new meal plan</p>
          <Link className="createPlan-Link" to="/plans/new">
            <div className="button">Create New Plan</div>
          </Link>
        </div>
      ) : (
        plans.map((plan, index) => (
          <Plan
            key={plan._id}
            plan={plan}
            onDelete={removePlan}
            image={images[index]}
          />
        ))
      )}
    </div>
  )
}

export default MyPlans

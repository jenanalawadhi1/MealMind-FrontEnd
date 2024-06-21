import { Link } from 'react-router-dom'
import { useState } from 'react'
import { DeletePlan } from '../services/MealPlanServices'

const Plan = ({ plan, onDelete, image }) => {
  const [planToDelete, setPlanToDelete] = useState(null)

  const handleDeletePlan = (planId) => {
    setPlanToDelete(planId)
  }

  const handleConfirmDeletePlan = async () => {
    if (planToDelete) {
      try {
        await DeletePlan(planToDelete)
        onDelete(planToDelete)
      } catch (error) {
        console.error(`Error deleting plan: ${error.message}`)
      }
      setPlanToDelete(null)
    }
  }

  const handleCancelDeletePlan = () => {
    setPlanToDelete(null)
  }

  return (
    <div>
      <h3>{plan.planName}</h3>
      <img src={image} />
      <button onClick={() => handleDeletePlan(plan._id)}>x</button>
      <Link to={`/plans/${plan._id}`}>
        <div className="button">Read More</div>
      </Link>
      {planToDelete && (
        <div>
          <p>Are you sure you want to delete this plan?</p>
          <button onClick={handleConfirmDeletePlan}>Yes</button>
          <button onClick={handleCancelDeletePlan}>No</button>
        </div>
      )}
    </div>
  )
}

export default Plan

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
    <div className="plan-post">
      <button
        className="delete-button"
        onClick={() => handleDeletePlan(plan._id)}
      >
        x
      </button>
      <div className="plan-content">
        <h3>{plan.planName}</h3>
        <img src={image} />
        <Link className="viewPlan-Link" to={`/plans/${plan._id}`}>
          <div className="button">View Plan</div>
        </Link>
      </div>
      {planToDelete && (
        <div className="delete-confirmation">
          <p>Delete Plan?</p>
          <div className="deleteCconfirmation-buttons">
            <button
              className="confirm-button"
              onClick={handleConfirmDeletePlan}
            >
              Delete
            </button>
            <button className="cancel-button" onClick={handleCancelDeletePlan}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Plan

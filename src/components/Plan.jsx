import { Link } from 'react-router-dom'
import { DeletePlan } from '../services/MealPlanServices'

const Plan = ({ plan }) => {
  const handleDeletePlan = (index) => {
    setCommentToDelete(index)
  }

  const handleConfirmDeletePlan = () => {
    DeleteComment(commentToDelete)
    setCommentToDelete(-1)
  }

  const handleCancelDeletePlan = () => {
    setCommentToDelete(-1)
  }

  return (
    <div>
      <h3>{plan.planName}</h3>
      <Link to={`/plans/${plan._id}`}>
        <div className="button">Read More</div>
      </Link>
    </div>
  )
}

export default Plan

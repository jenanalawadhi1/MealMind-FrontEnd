import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Client from '../services/api'
import CreatePost from '../components/CreatePost'

const ShowPlan = ({ user }) => {
  console.log('show plan user', user)
  const { id } = useParams() // Get the plan ID from the URL
  const [plan, setPlan] = useState(null)

  useEffect(() => {
    const getPlan = async () => {
      try {
        const response = await Client.get(`/mealplan/${id}`)
        setPlan(response.data)
      } catch (error) {
        console.error('Error fetching the meal plan:', error)
      }
    }
    getPlan()
  }, [id])

  if (!plan) {
    return <div>Loading...</div>
  }

  return (
    <div className="plan">
      <h1>Meal Plan</h1>
      <h2>{plan.planName}</h2>
      <p>Category: {plan.category}</p>
      <p>Calories: {plan.calories}</p>
      {plan.planDescription.map((day) => (
        <details key={day._id}>
          <summary> Day {day.index} </summary>
          <h4>Breakfast</h4>
          <p>{day.breakfast}</p>
          <h4>Snack</h4>
          <p>{day.snack}</p>
          <h4>Lunch</h4>
          <p>{day.lunch}</p>
          <h4>Dinner</h4>
          <p>{day.dinner}</p>
        </details>
      ))}
      <CreatePost planId={plan._id} userId={user.id} />
    </div>
  )
}

export default ShowPlan

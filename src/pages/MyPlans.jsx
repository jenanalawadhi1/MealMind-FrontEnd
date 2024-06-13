// view plans
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MyPlans = () => {
  const plans = [
    { planName: 'Weight Loss Program', id: 1 },
    { planName: 'Muscles gain Program', id: 2 },
    { planName: 'Diet Program', id: 3 }
  ]

  let navigate = useNavigate()

  const onClick = (id) =>{
    navigate(`/plans/${id}`)
  }

  return (
    <div className="feed">
      {plans.map((plan) => (
        <div key={plan.id}>
          <h3>{plan.planName}</h3>
          <div className="button" onClick={onClick}>Read More</div>
        </div>
      ))}
    </div>
  )
}

export default MyPlans

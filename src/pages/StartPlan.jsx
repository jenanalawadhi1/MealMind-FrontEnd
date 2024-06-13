// Case1: Login page if there's no user available

// Case2: TestForm to get the new plan if user logged in
import { useEffect, useState } from 'react'
import questions from '../../questions'

const StartPlan = () => {
  const initialState = {
    id: 0,
    content: '',
    options: []
  }
  const [questionForm, setQuestionForm] = useState(initialState)

  useEffect(() => {}, [])

  return (
    <div>
      <section></section>
    </div>
  )
}

export default StartPlan

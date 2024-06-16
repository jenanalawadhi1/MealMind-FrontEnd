import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import questions from '../../questions'
import TestForm from '../components/TestForm'
import { CreateNewPlan } from '../services/MealPlanServices'

const StartPlan = () => {
  const initialResponses = Array(questions.length).fill('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState(initialResponses)
  const [validationMessage, setValidationMessage] = useState('')
  const [units, setUnits] = useState({ weight: 'kg', height: 'cm' })
  const [otherResponses, setOtherResponses] = useState(initialResponses)
  const [mealPlan, setMealPlan] = useState(null)

  const navigate = useNavigate()

  const handleNext = () => {
    const currentResponse = responses[currentQuestionIndex]
    const currentOtherResponse = otherResponses[currentQuestionIndex]

    if (
      currentResponse &&
      (!Array.isArray(currentResponse) || currentResponse.length > 0)
    ) {
      if (
        currentResponse.includes('Other (please specify)') &&
        !currentOtherResponse
      ) {
        setValidationMessage('Please specify for the "Other" option.')
      } else {
        setValidationMessage('')
        setCurrentQuestionIndex(currentQuestionIndex + 1)
      }
    } else {
      setValidationMessage('Please answer the question before proceeding.')
    }
  }

  const handleBack = () => {
    setValidationMessage('')
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleDone = async () => {
    const currentResponse = responses[currentQuestionIndex]
    const currentOtherResponse = otherResponses[currentQuestionIndex]

    if (
      currentResponse &&
      (!Array.isArray(currentResponse) || currentResponse.length > 0)
    ) {
      if (
        currentResponse.includes('Other (please specify)') &&
        !currentOtherResponse
      ) {
        setValidationMessage('Please specify for the "Other" option.')
      } else {
        setValidationMessage('')

        // Collect all form data into an object
        const formData = {
          gender: responses[0],
          dob: responses[1],
          weight: responses[2],
          height: responses[3],
          goal: responses[4],
          activityLevel: responses[5],
          dietaryRestrictions: responses[6],
          medicalConditions: responses[7],
          dailyRoutine: responses[8],
          waterIntake: responses[9],
          units
        }

        try {
          const result = await CreateNewPlan(formData)
          console.log('Meal plan created:', result)
          setMealPlan(result)
          // Navigate to the newly created plan's page
          navigate(`/plans/${mealPlan._id}`)
        } catch (error) {
          console.error('Error creating meal plan:', error)
        }
      }
    } else {
      setValidationMessage('Please answer the question before proceeding.')
    }
  }

  const handleChange = (event) => {
    const newResponses = [...responses]
    newResponses[currentQuestionIndex] = event.target.value
    setResponses(newResponses)
  }

  const handleCheckboxChange = (event) => {
    const newResponses = [...responses]
    const value = event.target.value
    const currentResponses = newResponses[currentQuestionIndex] || []
    if (event.target.checked) {
      newResponses[currentQuestionIndex] = [...currentResponses, value]
    } else {
      newResponses[currentQuestionIndex] = currentResponses.filter(
        (response) => response !== value
      )
    }
    setResponses(newResponses)
  }

  const handleRadioChange = (event) => {
    const newResponses = [...responses]
    newResponses[currentQuestionIndex] = [event.target.value]
    setResponses(newResponses)
  }

  const handleOtherChange = (event) => {
    const newOtherResponses = [...otherResponses]
    newOtherResponses[currentQuestionIndex] = event.target.value
    setOtherResponses(newOtherResponses)
  }

  const handleUnitChange = (question, event) => {
    setUnits((prevUnits) => ({
      ...prevUnits,
      [question]: event.target.value
    }))
  }

  // Case 1: user logged in
  // TestForm to get the new plan
  return (
    <div>
      <TestForm
        currentQuestionIndex={currentQuestionIndex}
        questions={questions}
        responses={responses}
        otherResponses={otherResponses}
        units={units}
        validationMessage={validationMessage}
        handleChange={handleChange}
        handleCheckboxChange={handleCheckboxChange}
        handleRadioChange={handleRadioChange}
        handleOtherChange={handleOtherChange}
        handleUnitChange={handleUnitChange}
        handleNext={handleNext}
        handleBack={handleBack}
        handleDone={handleDone}
        mealPlan={mealPlan}
      />
    </div>
    // ) : (
    //   // Case 2: If user logged Out
    //   // Login
    //   <div>
    //     <Login />
    //   </div>
  )
}

export default StartPlan

import { useState } from 'react'
import questions from '../../questions'
import Login from '../components/Login'
import TestForm from '../components/TestForm'

const StartPlan = ({ user }) => {
  const initialResponses = Array(questions.length).fill('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState(initialResponses)
  const [validationMessage, setValidationMessage] = useState('')
  const [units, setUnits] = useState({ weight: 'kg', height: 'cm' })
  const [otherResponses, setOtherResponses] = useState(initialResponses)

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

  const handleDone = () => {
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
        alert('Form submitted successfully!')
        // Here you can handle the form submission, e.g., send responses to a server
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

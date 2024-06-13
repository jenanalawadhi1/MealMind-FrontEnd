// Case1: Login page if there's no user available

// Case2: TestForm to get the new plan if user logged in
import { useState } from 'react'
import questions from '../../questions'

const StartPlan = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState(Array(questions.length).fill(''))

  const handleNext = () => {
    if (responses[currentQuestionIndex] !== '') {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      alert('Please answer the question before proceeding.')
    }
  }

  const handleBack = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleDone = () => {
    if (responses[currentQuestionIndex] !== '') {
      alert('Form submitted successfully!')
      // Here you can handle the form submission, e.g., send responses to a server
    } else {
      alert('Please answer the question before proceeding.')
    }
  }

  const handleChange = (event) => {
    const newResponses = [...responses]
    newResponses[currentQuestionIndex] = event.target.value
    setResponses(newResponses)
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <form>
      <div>
        <label>{currentQuestion.content}</label>
        {currentQuestion.options.length > 0 ? (
          currentQuestion.content.includes('Check all that apply') ? (
            currentQuestion.options.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`${currentQuestion.id}-${index}`}
                  name={currentQuestion.content}
                  value={option}
                  onChange={handleChange}
                />
                <label htmlFor={`${currentQuestion.id}-${index}`}>
                  {option}
                </label>
              </div>
            ))
          ) : (
            <select
              value={responses[currentQuestionIndex]}
              onChange={handleChange}
            >
              <option value="">Select an option</option>
              {currentQuestion.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )
        ) : currentQuestion.content === 'Date of Birth:' ? (
          <input
            type="date"
            id="dob"
            name="dob"
            value={responses[currentQuestionIndex]}
            min="1900-01-01"
            max="2024-12-31"
            onChange={handleChange}
          />
        ) : (
          <input
            type="text"
            value={responses[currentQuestionIndex]}
            onChange={handleChange}
          />
        )}
      </div>
      <div>
        {currentQuestionIndex > 0 && (
          <button type="button" onClick={handleBack}>
            Back
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 && (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <button type="button" onClick={handleDone}>
            Done
          </button>
        )}
      </div>
    </form>
  )
}

export default StartPlan

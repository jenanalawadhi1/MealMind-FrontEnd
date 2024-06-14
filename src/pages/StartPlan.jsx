// Case1: Login page if there's no user available

// Case2: TestForm to get the new plan if user logged in
import { useState } from 'react'
import questions from '../../questions'

const StartPlan = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [responses, setResponses] = useState(Array(questions.length).fill(''))
  const [validationMessage, setValidationMessage] = useState('')
  const [units, setUnits] = useState({ weight: 'kg', height: 'cm' })
  const [otherResponses, setOtherResponses] = useState(
    Array(questions.length).fill('')
  )

  const handleNext = () => {
    if (responses[currentQuestionIndex] !== '') {
      setValidationMessage('')
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setValidationMessage('Please answer the question before proceeding.')
    }
  }

  const handleBack = () => {
    setValidationMessage('')
    setCurrentQuestionIndex(currentQuestionIndex - 1)
  }

  const handleDone = () => {
    if (responses[currentQuestionIndex] !== '') {
      setValidationMessage('')
      alert('Form submitted successfully!')
      // Here you can handle the form submission, e.g., send responses to a server
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

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <form>
      <div>
        <label>{currentQuestion.content}</label>
        {currentQuestion.options.length > 0 ? (
          currentQuestion.content ===
          'Do you have any medical conditions we should consider?' ? (
            <div>
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    id={`${currentQuestion.id}-${index}`}
                    name={currentQuestion.content}
                    value={option}
                    checked={(responses[currentQuestionIndex] || []).includes(
                      option
                    )}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor={`${currentQuestion.id}-${index}`}>
                    {option}
                  </label>
                  {option === 'Other (please specify)' &&
                    (responses[currentQuestionIndex] || []).includes(
                      option
                    ) && (
                      <input
                        type="text"
                        value={otherResponses[currentQuestionIndex] || ''}
                        onChange={handleOtherChange}
                        placeholder="Please specify"
                      />
                    )}
                </div>
              ))}
            </div>
          ) : (
            <div>
              {currentQuestion.options.map((option, index) => (
                <div key={index}>
                  <input
                    type="radio"
                    id={`${currentQuestion.id}-${index}`}
                    name={currentQuestion.content}
                    value={option}
                    checked={
                      (responses[currentQuestionIndex] || [])[0] === option
                    }
                    onChange={handleRadioChange}
                  />
                  <label htmlFor={`${currentQuestion.id}-${index}`}>
                    {option}
                  </label>
                  {option === 'Other (please specify)' &&
                    (responses[currentQuestionIndex] || [])[0] === option && (
                      <input
                        type="text"
                        value={otherResponses[currentQuestionIndex] || ''}
                        onChange={handleOtherChange}
                        placeholder="Please specify"
                      />
                    )}
                </div>
              ))}
            </div>
          )
        ) : currentQuestion.content.includes('Weight') ? (
          <div>
            <input
              type="number"
              value={responses[currentQuestionIndex]}
              onChange={handleChange}
              placeholder={`Enter weight in ${units.weight}`}
            />
            <div>
              <select
                value={units.weight}
                onChange={(e) => handleUnitChange('weight', e)}
              >
                <option value="kg">kg</option>
                <option value="lbs">lbs</option>
              </select>
            </div>
          </div>
        ) : currentQuestion.content.includes('Height') ? (
          <div>
            <input
              type="number"
              value={responses[currentQuestionIndex]}
              onChange={handleChange}
              placeholder={`Enter height in ${units.height}`}
            />
            <div>
              <select
                value={units.height}
                onChange={(e) => handleUnitChange('height', e)}
              >
                <option value="cm">cm</option>
                <option value="ft">ft</option>
              </select>
            </div>
          </div>
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
      {validationMessage && <p style={{ color: 'red' }}>{validationMessage}</p>}
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

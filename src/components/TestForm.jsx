const TestForm = ({
  currentQuestionIndex,
  questions,
  responses,
  otherResponses,
  units,
  validationMessage,
  handleChange,
  handleCheckboxChange,
  handleRadioChange,
  handleOtherChange,
  handleUnitChange,
  handleNext,
  handleBack,
  handleDone,
}) => {
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <form className="testForm">
      <div>
        <label>{`${currentQuestionIndex + 1}. ${
          currentQuestion.content
        }`}</label>
        {currentQuestion.options.length > 0 ? (
          currentQuestion.id === 8 ? (
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
        ) : currentQuestion.id === 3 || currentQuestion.id === 4 ? (
          <div>
            <input
              type="text"
              value={responses[currentQuestionIndex] || ''}
              onChange={handleChange}
              placeholder={currentQuestion.id === 3 ? 'Weight' : 'Height'}
            />
            <select
              value={units[currentQuestion.id === 3 ? 'weight' : 'height']}
              onChange={(e) =>
                handleUnitChange(
                  currentQuestion.id === 3 ? 'weight' : 'height',
                  e
                )
              }
            >
              <option value="kg">kg</option>
              <option value="lbs">lbs</option>
              <option value="cm">cm</option>
              <option value="ft">ft</option>
            </select>
          </div>
        ) : (
          <input
            type={currentQuestion.id === 2 ? 'date' : 'text'}
            value={responses[currentQuestionIndex] || ''}
            onChange={handleChange}
            placeholder={currentQuestion.content}
          />
        )}
      </div>
      {validationMessage && (
        <div className="validation-message">{validationMessage}</div>
      )}
      <div className="buttons">
        {currentQuestionIndex > 0 && (
          <button type="button" onClick={handleBack}>
            Back
          </button>
        )}
        {currentQuestionIndex < questions.length - 1 ? (
          <button type="button" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button type="button" onClick={handleDone}>
            Done
          </button>
        )}
      </div>
    </form>
  )
}

export default TestForm

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
  mealPlan
}) => {
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div>
      <form>
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
        {validationMessage && <p>{validationMessage}</p>}
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
    </div>
  )
}

export default TestForm

const questions = [
  {
    id: 1,
    content: 'Gender:',
    options: ['Male', 'Female']
  },
  {
    id: 2,
    content: 'Date of Birth:',
    options: []
  },
  {
    id: 3,
    content: 'Weight (in kilograms or pounds):',
    options: []
  },
  {
    id: 4,
    content: 'Height (in centimeters or feet/inches):',
    options: []
  },
  {
    id: 5,
    content: 'What is your goal?',
    options: ['Lose weight', 'Maintain current weight', 'Gain weight']
  },
  {
    id: 6,
    content: 'Activity level:',
    options: [
      'Sedentary (little to no exercise)',
      'Lightly active (light exercise/sports 1-3 days a week)',
      'Moderately active (moderate exercise/sports 3-5 days a week)',
      'Very active (hard exercise/sports 6-7 days a week)',
      'Extra active (very hard exercise/sports & physical job)'
    ]
  },
  {
    id: 7,
    content: 'Do you have any dietary restrictions or preferences?',
    options: [
      'None',
      'Vegetarian',
      'Vegan',
      'Gluten-free',
      'Dairy-free',
      'Other (please specify)'
    ]
  },
  {
    id: 8,
    content:
      'Do you have any medical conditions we should consider? (Check all that apply)',
    options: [
      'None',
      'Diabetes',
      'Food allergies',
      'Digestive disorders',
      'Other (please specify)'
    ]
  },
  {
    id: 9,
    content: 'How would you describe your daily routine?',
    options: [
      'Busy, often on the go',
      'Regular schedule with time for meals',
      'Irregular schedule with unpredictable meal times'
    ]
  },
  {
    id: 10,
    content: 'How many glasses of water do you typically drink per day?',
    options: [
      'Less than 4 glasses',
      '4-6 glasses',
      '7-9 glasses',
      '10 or more glasses'
    ]
  }
]

export default questions

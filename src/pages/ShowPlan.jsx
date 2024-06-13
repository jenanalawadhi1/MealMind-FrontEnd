import { useState } from 'react'
import CreatePost from '../components/CreatePost'

const ShowPlan = () => {
  // tempo
  const plan = {
    _id: 1,
    planName: 'Weight Loss Program',
    planDescription: [
      {
        index: 1,
        breakfast: '1 cup nonfat plain Greek yogurt, 150g mixed berries',
        snack: '1 medium apple, 1 tbsp almond butter',
        lunch: 'Grilled chicken breast, 100g, roasted vegetables',
        dinner: 'Baked salmon, 120g, quinoa and steamed asparagus',
        _id: '66696a2ec18241628dd19f78'
      },
      {
        index: 2,
        breakfast:
          '2 whole-grain toast, 2 tbsp avocado spread, 2 slices turkey bacon',
        snack: '1 small pear, 1 oz dry-roasted almonds',
        lunch:
          'Grilled chicken wrap, 100g, mixed greens and whole-grain tortilla',
        dinner:
          'Grilled turkey burger, 120g, sweet potato and steamed broccoli',
        _id: '66696a2ec18241628dd19f79'
      },
      {
        index: 3,
        breakfast: '1 small banana, 1 whole-grain pita, 2 tbsp peanut butter',
        snack: '1 small container hummus, 1 cup carrot sticks',
        lunch:
          'Grilled chicken breast, 100g, mixed greens and whole-grain pita',
        dinner: 'Baked cod, 120g, quinoa and steamed green beans',
        _id: '66696a2ec18241628dd19f7a'
      },
      {
        index: 4,
        breakfast: '1 hard-boiled egg, 1 cup nonfat plain Greek yogurt',
        snack: '1 small container Greek yogurt, 1 small pear',
        lunch: 'Grilled chicken Caesar salad',
        dinner:
          'Grilled pork chop, 120g, roasted Brussels sprouts and sweet potato',
        _id: '66696a2ec18241628dd19f7b'
      },
      {
        index: 5,
        breakfast:
          '1 small avocado, 2 whole-grain toast, 2 slices turkey bacon',
        snack: '1 small pear, 1 oz dry-roasted almonds',
        lunch:
          'Grilled chicken breast, 100g, mixed greens and whole-grain pita',
        dinner: 'Baked chicken breast, 120g, quinoa and steamed asparagus',
        _id: '66696a2ec18241628dd19f7c'
      },
      {
        index: 6,
        breakfast: '1 small banana, 1 small container hummus',
        snack: '1 small container nonfat plain Greek yogurt',
        lunch:
          'Grilled chicken wrap, 100g, mixed greens and whole-grain tortilla',
        dinner:
          'Grilled turkey burger, 120g, sweet potato and steamed broccoli',
        _id: '66696a2ec18241628dd19f7d'
      },
      {
        index: 7,
        breakfast: '1 hard-boiled egg, 1 cup nonfat plain Greek yogurt',
        snack: '1 small pear, 1 oz dry-roasted almonds',
        lunch: 'Grilled chicken Caesar salad',
        dinner: 'Baked cod, 120g, quinoa and steamed green beans',
        _id: '66696a2ec18241628dd19f7e'
      }
    ],
    calories: 1500,
    category: 'Weight Loss',
    createdAt: '2024-06-12T09:28:14.772Z',
    updatedAt: '2024-06-12T09:28:14.772Z',
    __v: 0
  }
  //

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
      <CreatePost id={plan._id}/>
    </div>
  )
}

export default ShowPlan

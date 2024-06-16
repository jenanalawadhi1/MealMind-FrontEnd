import Client from './api'

export const GetMyPlans = async (userId) => {
  try {
    const res = await Client.get('/mealplan', {
      params: { userId }
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateNewPlan = async (data) => {
  try {
    const res = await Client.post('/mealplan', data)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

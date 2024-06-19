import Client from './api'

export const GetMyPlans = async (userId) => {
  try {
    const res = await Client.get(`/mealplan?userId=${userId}`)
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

export const DeletePlan = async (planId) => {
  try {
    const res = await Client.delete(`/mealplan/${planId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

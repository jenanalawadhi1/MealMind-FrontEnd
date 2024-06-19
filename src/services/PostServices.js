import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/posts')
    return res.data
  } catch (error) {
    throw error
  }
}

export const GetPlanPosts = async (planId) => {
  try {
    const res = await Client.get(`/posts/${planId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateNewPost = async (data) => {
  try {
    const res = await Client.post('/posts', data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const UpdatePost = async (postId, data) => {
  try {
    const res = await Client.put(`/posts/${postId}`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const DeletePost = async (postId) => {
  try {
    const res = await Client.delete(`/posts/${postId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

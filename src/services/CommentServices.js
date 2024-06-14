import Client from './api'

export const GetComments = async (postId) => {
  try {
    const res = await Client.get('/posts/' + postId + '/comments')
    return res.data
  } catch (error) {
    throw error
  }
}

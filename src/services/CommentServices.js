import Client from './api'

export const getComments = async (postId) => {
  try {
    const res = await Client.get('/posts/' + postId + '/comments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const addComment = async (postId, comment) => {
  try {
    const res = await Client.post(`/posts/${postId}/comments`, {
      user: 'Anonymous',
      comment
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateComment = async (postId, commentIndex, newComment) => {
  try {
    const res = await Client.put(`/posts/${postId}/comments/${commentIndex}`, {
      comment: newComment
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteComment = async (postId, commentIndex) => {
  try {
    const res = await Client.delete(`/posts/${postId}/comments/${commentIndex}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export default Client

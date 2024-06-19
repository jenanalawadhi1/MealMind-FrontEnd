import Client from './api'

export const getComments = async (postId) => {
  try {
    const res = await Client.get('/posts/' + postId + '/comments')
    return res.data
  } catch (error) {
    throw error
  }
}

export const addComment = async (postId, data) => {
  try {
    const res = await Client.post(`/posts/${postId}/comments`, data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const updateComment = async (postId, commentId, newComment) => {
  try {
    const res = await Client.put(`/posts/${postId}/comments/${commentId}`, {
      comment: newComment
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteComment = async (postId, commentId) => {
  console.log('commment id', commentId);
  
  try {
    const res = await Client.delete(`/posts/${postId}/comments/${commentId}`)
    return res.data
  } catch (error) {
    throw error
  }
}

export default Client

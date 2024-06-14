import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/posts')
    console.log(res.data);
    return res.data
  } catch (error) {
    throw error
  }
}

export const CreateNewPost = async () => {
  try {
    const res = await Client.post('/posts')
    console.log(res.data);
    return res.data
  } catch (error) {
    throw error
  }
}

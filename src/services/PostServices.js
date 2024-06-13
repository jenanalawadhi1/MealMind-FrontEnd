import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/posts')
    console.log(res);
    return res.data
  } catch (error) {
    throw error
  }
}

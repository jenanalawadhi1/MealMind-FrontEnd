import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CreateNewPost, GetPlanPosts } from '../services/PostServices'
import UserPost from '../components/UserPost'

// ShowPlan is the parent
const CreatePost = ({ planId, userId }) => {
  const { id } = useParams() //plan id
  const [posts, setPosts] = useState(null)
  const [formValues, setFormValues] = useState({
    title: '',
    caption: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    //post id
    console.log('plan id: ', planId, 'user id: ', userId)
    // create new post using planID
    CreateNewPost({ ...formValues, user: userId, plan: planId })
    setPosts((prevPosts) => [...prevPosts, newPost])
    setFormValues({
      title: '',
      caption: ''
    })
  }

  const removePost = (postId) => {
    setPosts(posts.filter((post) => post._id !== postId))
  }

  useEffect(() => {
    const getplanposts = async () => {
      try {
        const response = await GetPlanPosts(id)
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getplanposts()
  }, [id])

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          onChange={handleChange}
          name="title"
          value={formValues.title}
          type="text"
          placeholder="Title"
          required
        />
        <input
          onChange={handleChange}
          name="caption"
          value={formValues.caption}
          type="text"
          placeholder="Caption"
          required
        />
        <button>Post</button>
      </form>
      {posts && (
        <div>
          <h1>Previous Posts</h1>
          {posts.map((post) => (
            <div key={post._id}>
              <UserPost post={post} setPosts={setPosts} onDelete={removePost} planId={planId} />
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default CreatePost

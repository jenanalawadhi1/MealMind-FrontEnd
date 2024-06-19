import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Client from '../services/api'
import { DeletePost, GetPlanPosts } from '../services/PostServices'
import CreatePost from '../components/CreatePost'
import Post from '../components/Post'

const ShowPlan = ({ user }) => {
  console.log('show plan user', user)
  const { id } = useParams() // Get the plan ID from the URL
  const [plan, setPlan] = useState(null)
  const [posts, setPosts] = useState(null)
  const [postToDelete, setPostToDelete] = useState(null)

  const handleDeletePost = (postId) =>{
    setPostToDelete(postId)
  }

  const handleConfirmDeletePost = async () =>{
    if(postToDelete){
      try {
        await DeletePost(postToDelete)
        
      } catch (error) {
        
      }
    }
  }

  useEffect(() => {
    // getPlan()
    const getPlan = async () => {
      try {
        const response = await Client.get(`/mealplan/${id}`)
        setPlan(response.data)
      } catch (error) {
        console.error('Error fetching the meal plan:', error)
      }
    }
    const getplanposts = async () => {
      try {
        const response = await GetPlanPosts(id)
        setPosts(response)
      } catch (error) {
        console.error('Error fetching posts:', error)
      }
    }
    getPlan()
    getplanposts()
  }, [id])

  if (!plan) {
    return <div>Loading...</div>
  }

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
      <CreatePost planId={plan._id} userId={user.id} />
      {posts && (
        <div>
          <h1>Previous Posts</h1>
          {posts.map((post) => (
            <div>
              <Post key={post._id} post={post} />
              <div>X</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ShowPlan

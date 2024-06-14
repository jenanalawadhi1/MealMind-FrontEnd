import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GetPosts } from '../services/PostServices'

const Home = ({ user }) => {
  let navigate = useNavigate()

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getposts = async () => {
      const data = await GetPosts()
      setPosts(data)
    }
    getposts()
  }, [])

  // Case 1: user logged in
  // ViewPosts
  return user ? (
    <div className="feed">
      {posts.map((post) => (
        <div key={post._id} className="feed-post">
          <h3>Published By {post.user.firstName}</h3>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <div className="button" onClick={()=> navigate(`/posts/${post._id}`)}>Read More</div>
        </div>
      ))}
    </div>
  ) : (
    // Case 2: If user logged Out
    // GetStarted btn
    // Login btn
    <div className="home-guest">
      <div>
        <h1 className="home-text">Let's Begin Your Diet Planning</h1>
        <p>Choose what's good for you</p>
        <button onClick={() => navigate('/login')}>Get Started</button>
      </div>
      <img src="../../images/imageholder.jpg" alt="healthy girl picture" />
    </div>
  )
}

export default Home

import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GetPosts } from '../services/PostServices'
import Post from '../components/Post'

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
  return user ? (
    <div className="feed">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  ) : (
    <div className="home-guest">
      <div>
        <h1 className="home-text">Let's Begin Your Diet Planning</h1>
        <p>Choose what's good for you</p>
        <button className="button" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
      <img src="../../images/imageholder.jpg" alt="healthy girl picture" />
    </div>
  )
}

export default Home

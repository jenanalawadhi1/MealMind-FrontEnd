import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GetPosts } from '../services/PostServices'
import Post from '../components/Post'
import Loading from '../components/Loading'

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
    posts.length !== 0 ? (
      <div className="feed">
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    ) : (
      <Loading />
    )
  ) : (
    <div className="home-guest">
      <div>
        <h1 className="home-text">Let's Begin Your Diet Planning</h1>
        <p>Choose what's good for you</p>
        <button className="button home-button" onClick={() => navigate('/login')}>
          Get Started
        </button>
      </div>
      <img
        src="https://www12.0zz0.com/2024/06/20/08/988759870.png"
        alt="healthy girl picture"
      />
    </div>
  )
}

export default Home

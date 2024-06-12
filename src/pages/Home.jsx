import { useContext } from 'react'
import { AuthContext } from '../context/UserContext'

const Home = () => {
  // const { user } = useContext(AuthContext)

  //tempo
  const user = true
  const posts = [
    { id: 1, title: 'day 1 of keto', caption: 'full of energy' },
    { id: 2, title: 'day 2 of keto', caption: ' abit hungry' },
    { id: 3, title: 'day 3 of vegan plan', caption: 'I miss meat' }
  ]
  //

  // Case 1: user logged in
  // ViewPosts
  return user ? (
    <div className="feed">
      {posts.map((post) => (
        <div key={post.id} className="feed-post">
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <div className="button">Read More</div>
        </div>
      ))}
    </div>
  ) : (
    // Case 2: If user logged Out
    // GetStarted btn
    // Login btn
    <div className="home-guest">
      <div>
        <h1 className="home-text">Let’s Begin Your Diet Planning</h1>
        <p>Choose what's good for you</p>
        <div className="button">Get Started</div>
      </div>
      <img src="../../images/imageholder.jpg" alt="healthy girl picture" />
    </div>
  )
}

export default Home

import ViewPost from '../components/ViewPost'

const Home = () => {
  // const { user } = useContext(AuthContext)

  //tempo
  const user = true
  const posts = [
    {
      id: 1,
      title: 'day 1 of keto',
      caption: 'full of energy',
      name: 'Hawra',
      comments: [
        {
          id: 1,
          comment: 'Great progress! Keep it up!',
          user: 'User123'
        },
        {
          id: 2,
          comment: 'I love keto too!',
          user: 'HealthyEater'
        }
      ]
    },
    {
      id: 2,
      title: 'day 2 of keto',
      caption: 'abit hungry',
      name: 'Jenan',
      comments: [
        {
          id: 1,
          comment: 'Stay hydrated!',
          user: 'WellnessGuru'
        },
        {
          id: 2,
          comment: 'Listen to your body.',
          user: 'MindfulEater'
        }
      ]
    },
    {
      id: 3,
      title: 'day 3 of vegan plan',
      caption: 'I miss meat',
      name: 'Fatema',
      comments: [
        {
          id: 1,
          comment: 'Try some tasty vegan alternatives!',
          user: 'VeggieLover'
        },
        {
          id: 2,
          comment: 'You got this!',
          user: 'MotivatedEater'
        }
      ]
    }
  ]

  // Case 1: user logged in
  // ViewPosts
  return user ? (
    <div className="feed">
      {posts.map((post) => (
        <ViewPost key={post.id} className="feed-post" post={post}/>
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
        <div className="button">Get Started</div>
      </div>
      <img src="../../images/imageholder.jpg" alt="healthy girl picture" />
    </div>
  )
}

export default Home

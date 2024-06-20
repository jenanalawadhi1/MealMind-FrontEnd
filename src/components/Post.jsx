import { useNavigate } from 'react-router-dom'

const Post = ({ post }) => {
  let navigate = useNavigate()
  return (
    <div className="feed-post">
      {post.user?.firstName && (
        <h3 className="post-header">Published By {post.user.firstName}</h3>
      )}
      <div className="post-content">
        <h3>{post.title}</h3>
        <p>{post.caption}</p>
        <div className="button" onClick={() => navigate(`/posts/${post._id}`)}>
          Read More
        </div>
      </div>
    </div>
  )
}

export default Post

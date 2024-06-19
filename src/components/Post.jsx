import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeletePost } from '../services/PostServices'

const Post = ({ post, onDelete }) => {
  let navigate = useNavigate()
  const [postToDelete, setPostToDelete] = useState(null)

  const handleDeletePost = (postId) => {
    setPostToDelete(postId)
  }

  const handleConfirmDeletePost = async () => {
    if (postToDelete) {
      try {
        await DeletePost(postToDelete)
        onDelete(postToDelete)
        console.log(`Post ${postToDelete} deleted successfully`)
      } catch (error) {
        console.error(`Error deleting post: ${error.message}`)
      }
      setPostToDelete(null)
    }
  }

  const handleCancelDeletePost = () => {
    setPostToDelete(null)
  }

  return (
    <div className="feed-post">
      {post.user?.firstName && <h3>Published By {post.user.firstName}</h3>}
      <h3>{post.title}</h3>
      <p>{post.caption}</p>
      <button onClick={() => handleDeletePost(post._id)}>X</button>
      {postToDelete && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleConfirmDeletePost}>Yes</button>
          <button onClick={handleCancelDeletePost}>No</button>
        </div>
      )}
      <div className="button" onClick={() => navigate(`/posts/${post._id}`)}>
        Read More
      </div>
    </div>
  )
}

export default Post

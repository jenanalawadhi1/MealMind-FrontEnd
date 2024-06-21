import { useState } from 'react'
import { DeletePost, UpdatePost } from '../services/PostServices'

const UserPost = ({ post, onDelete, setPosts }) => {
  const [postToDelete, setPostToDelete] = useState(null)
  const [postBeingEdited, setPostBeingEdited] = useState(null)
  const [formValues, setFormValues] = useState({
    title: '',
    caption: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleDeletePost = (postId) => {
    setPostToDelete(postId)
  }

  const handleConfirmDeletePost = async () => {
    if (postToDelete) {
      try {
        await DeletePost(postToDelete)
        onDelete(postToDelete)
      } catch (error) {
        console.error(`Error deleting post: ${error.message}`)
      }
      setPostToDelete(null)
    }
  }

  const handleCancelDeletePost = () => {
    setPostToDelete(null)
  }

  const handleEditClick = (post) => {
    setPostBeingEdited(post)
    setFormValues({ title: post.title, caption: post.caption })
  }

  const handleUpdateSubmit = async (event) => {
    event.preventDefault()
    try {
      await UpdatePost(postBeingEdited._id, formValues)
      setPosts((prevPosts) => {
        return prevPosts.map((p) => {
          if (p._id === postBeingEdited._id) {
            return { ...p, ...formValues }
          } else {
            return p
          }
        })
      })
      setPostBeingEdited(null)
    } catch (error) {
      console.error(`Error updating post: ${error.message}`)
    }
  }

  return (
    <div className="feed-post">
      <h3 className="post-header">Published By {post.user.firstName}</h3>
      {postBeingEdited ? (
        <div className="post-content">
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
          <div>
            <button onClick={handleUpdateSubmit}>Submit Update</button>
            <button onClick={() => setPostBeingEdited(null)}>Cancel</button>
          </div>
        </div>
      ) : postToDelete ? (
        <div className="post-content">
          <p>Are you sure you want to delete this post?</p>
          <div>
            <button onClick={handleConfirmDeletePost}>Yes</button>
            <button onClick={handleCancelDeletePost}>No</button>
          </div>
        </div>
      ) : (
        <div className="post-content">
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <div>
            <button onClick={() => handleDeletePost(post._id)}>Delete</button>
            <button onClick={() => handleEditClick(post)}>Update</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserPost

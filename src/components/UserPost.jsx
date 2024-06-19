import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DeletePost, UpdatePost } from '../services/PostServices'

const UserPost = ({ post, onDelete, setPosts }) => {
  let navigate = useNavigate()
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

  const handleEditClick = (post) => {
    setPostBeingEdited(post)
    setFormValues({ title: post.title, caption: post.caption })
  }

  const handleUpdateSubmit = async (event) => {
    event.preventDefault()
    try {
      console.log('update form values: ', formValues)
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
      <h3>Published By {post.user.firstName}</h3>
      {postBeingEdited ? (
        <div>
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
          <button onClick={handleUpdateSubmit}>Submit Update</button>
          <button onClick={() => setPostBeingEdited(null)}>Cancel</button>
        </div>
      ) : postToDelete ? (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleConfirmDeletePost}>Yes</button>
          <button onClick={handleCancelDeletePost}>No</button>
        </div>
      ) : (
        <div>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <button onClick={() => handleDeletePost(post._id)}>Delete</button>
          <button onClick={() => handleEditClick(post)}>Update</button>
        </div>
      )}
      {/* <h3>{post.title}</h3>
      <p>{post.caption}</p>
      <button onClick={() => handleDeletePost(post._id)}>X</button>
      <button onClick={() => handleEditClick(post)}>Update</button>
      {postBeingEdited && postBeingEdited._id === post._id && (
        <div>
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
          <button onClick={handleUpdateSubmit}>Submit Update</button>
          <button onClick={() => setPostBeingEdited(null)}>Cancel</button>
          </div>
      )}
      {postToDelete && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleConfirmDeletePost}>Yes</button>
          <button onClick={handleCancelDeletePost}>No</button>
        </div>
      )}
      <div className="button" onClick={() => navigate(`/posts/${post._id}`)}>
        Read More
      </div> */}
    </div>
  )
}

export default UserPost

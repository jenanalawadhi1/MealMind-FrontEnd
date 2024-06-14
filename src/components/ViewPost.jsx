import { useState } from 'react'

const ViewPost = ({ post, AddComment, UpdateComment, DeleteComment }) => {
  const [newComment, setNewComment] = useState('')
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1)
  const [editedComment, setEditedComment] = useState('')
  const [commentToDelete, setCommentToDelete] = useState(-1)

  const handleAddComment = () => {
    if (newComment.trim() !== '') {
      AddComment(newComment.trim())
      setNewComment('')
    }
  }

  const handleEditComment = (index) => {
    setEditingCommentIndex(index)
    setEditedComment(post.comments[index].comment)
  }

  const handleUpdateComment = () => {
    if (editedComment.trim() !== '') {
      UpdateComment(editingCommentIndex, editedComment.trim())
      setEditingCommentIndex(-1)
      setEditedComment('')
    }
  }

  const handleDeleteComment = (index) => {
    setCommentToDelete(index)
  }

  const handleConfirmDeleteComment = () => {
    DeleteComment(commentToDelete)
    setCommentToDelete(-1)
  }

  const handleCancelDeleteComment = () => {
    setCommentToDelete(-1)
  }

  return (
    <div>
      <h3>Published By {post.name}</h3>
      <h3>{post.title}</h3>
      <p>{post.caption}</p>
      <div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button onClick={handleAddComment}>Add Comment</button>
      </div>
      <details>
        <summary>Comments</summary>
        {post.comments.map((comment, index) => (
          <div key={index}>
            <div className="user">
              <img src="avatar" alt="avatar" />
              {comment.user}
            </div>
            {editingCommentIndex === index ? (
              <div>
                <input
                  type="text"
                  value={editedComment}
                  onChange={(e) => setEditedComment(e.target.value)}
                />
                <button onClick={handleUpdateComment}>Update</button>
                <button onClick={() => setEditingCommentIndex(-1)}>
                  Cancel
                </button>
              </div>
            ) : commentToDelete === index ? (
              <div>
                <p>Are you sure you want to delete this comment?</p>
                <button onClick={handleConfirmDeleteComment}>Confirm</button>
                <button onClick={handleCancelDeleteComment}>Cancel</button>
              </div>
            ) : (
              <div>
                <p>{comment.comment}</p>
                <button onClick={() => handleEditComment(index)}>Edit</button>
                <button onClick={() => handleDeleteComment(index)}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </details>
    </div>
  )
}

export default ViewPost

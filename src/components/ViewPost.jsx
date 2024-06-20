import { useEffect, useState } from 'react'
import { GetOnePost } from '../services/PostServices'
import { useParams } from 'react-router-dom'
import {
  addComment,
  updateComment,
  deleteComment
} from '../services/CommentServices'
import Loading from './Loading'

const ViewPost = ({ user }) => {
  const [post, setPost] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [editingCommentIndex, setEditingCommentIndex] = useState(-1)
  const [editedComment, setEditedComment] = useState('')
  const [commentToDelete, setCommentToDelete] = useState(-1)
  const { id } = useParams() //post id

  const handleAddComment = async () => {
    if (newComment.trim() !== '') {
      console.log('user', user)
      const data = { comment: newComment.trim(), user: user.id }
      // addComment(id, data)
      const newCommentResponse = await addComment(id, data)
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newCommentResponse]
      }))
      setNewComment('')
    }
  }

  const handleEditComment = (index) => {
    setEditingCommentIndex(index)
    setEditedComment(post.comments[index].comment)
  }

  const handleUpdateComment = async () => {
    if (editedComment.trim() !== '') {
      const commentID = post.comments[editingCommentIndex]._id
      await updateComment(id, commentID, editedComment.trim())
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((comment) =>
          comment._id === commentID
            ? { ...comment, comment: editedComment }
            : comment
        )
      }))
      setEditingCommentIndex(-1)
      setEditedComment('')
    }
  }

  const handleDeleteComment = (index) => {
    setCommentToDelete(index)
  }

  const handleConfirmDeleteComment = async () => {
    const commentID = post.comments[commentToDelete]._id
    await deleteComment(id, commentID)
    setPost((prevPost) => ({
      ...prevPost,
      comments: prevPost.comments.filter(
        (comment, index) => index !== commentToDelete
      )
    }))
    setCommentToDelete(-1)
  }

  const handleCancelDeleteComment = () => {
    setCommentToDelete(-1)
  }

  const getPost = async () => {
    try {
      const post = await GetOnePost(id)
      console.log('post comments', post.comments)
      setPost(post)
    } catch (error) {
      console.error('Error getting user plans:', error)
    }
  }

  useEffect(() => {
    console.log('using effect')
    getPost()
  }, [id])

  return post ? (
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
        <summary className="comments">Comments</summary>
        {post.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="user">
              <img
                className="avatar"
                src="../../images/avatar1.png"
                alt="avatar"
              />
              {comment.user.firstName}
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
                {comment.user._id === user.id && (
                  <>
                    <button onClick={() => handleEditComment(index)}>
                      Edit
                    </button>
                    <button onClick={() => handleDeleteComment(index)}>
                      Delete
                    </button>{' '}
                  </>
                )}
              </div>
            )}
          </div>
        ))}
        {/* add comment */}
      </details>
    </div>
  ) : (
    <Loading />
  )
}

export default ViewPost

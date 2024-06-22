import { useEffect, useState } from 'react'
import { GetOnePost } from '../services/PostServices'
import { useParams, Link } from 'react-router-dom'
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
      const data = { comment: newComment.trim(), user: user.id }
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
      setPost(post)
    } catch (error) {
      console.error('Error getting user plans:', error)
    }
  }

  useEffect(() => {
    getPost()
  }, [id])

  return post ? (
    <div className="post">
      <h3>Published By {post.user.firstName}</h3>
      <Link className="viewPlan-Link" to={`/plans/${post.plan}`}>
        <div className="button">View The Plan</div>
      </Link>
      <h3>{post.title}</h3>
      <p id="caption">{post.caption}</p>
      <div>
        <input
          id="addingComment"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
        />
        <button id="commentBtn" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
      <details>
        <summary className="comments">Comments</summary>
        {post.comments.map((comment, index) => (
          <div className="comment" key={index}>
            <div className="user">
              <img
                className="avatar"
                src="https://www7.0zz0.com/2024/06/22/10/905708374.png"
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
      </details>
    </div>
  ) : (
    <Loading />
  )
}

export default ViewPost

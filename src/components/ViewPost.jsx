const ViewPost = ({ post }) => {
  return (
    <div>
      <h3>Published By {post.name}</h3>
      <h3>{post.title}</h3>
      <p>{post.caption}</p>
      <details>
        <summary>Comments</summary>
        {post.comments.map((comment) => (
          <div>
            <div className="user">
              <img src="avatar" alt="avatar" />
              {comment.user}
            </div>
            <p>{comment.comment}</p>
          </div>
        ))}
        {/* add comment */}
      </details>
    </div>
  )
}

export default ViewPost

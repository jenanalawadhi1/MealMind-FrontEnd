import { useNavigate } from "react-router-dom"

const Post = ({post}) =>{
  let navigate = useNavigate()
  return(
    <div className="feed-post">
          <h3>Published By {post.user.firstName}</h3>
          <h3>{post.title}</h3>
          <p>{post.caption}</p>
          <div className="button" onClick={()=> navigate(`/posts/${post._id}`)}>Read More</div>
        </div>
  )
}

export default Post
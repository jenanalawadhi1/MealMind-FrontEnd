import { useState } from "react"

const CreatePost = ({id}) => {
  const [formValues, setFormValues] = useState({
    title: '',
    caption: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
    console.log(e.target.name, e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('id: ', id)
    // create new post using planID
    setFormValues({
      title: '',
      caption: ''
    })
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
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
      <button>Post</button>
    </form>
  )
}

export default CreatePost

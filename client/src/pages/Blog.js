import React from 'react'

const Blog = (props) => {
    const {title, image, description} = props.blog;
  return (
    <div>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
    </div>
  )
}

export default Blog
import React from "react"

const Projects = ({project}) => {
  return(
    <article>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      
    </article>
  )
}

export default Projects
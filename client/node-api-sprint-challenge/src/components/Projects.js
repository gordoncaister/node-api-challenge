import React from "react"

const Projects = ({project}) => {
  return(
    <article>
      <p>{project.name}</p>
      <p>{project.description}</p>
      <ul>
          {project.actions.map((action,i)=>(
              <li>{action.description}</li>
              ))}
      </ul>
    </article>
  )
}

export default Projects
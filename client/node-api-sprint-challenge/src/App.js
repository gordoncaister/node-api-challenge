import React,{useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios"
import Projects from "./components/Projects.js"



function App() {
  
  const [projects, setProjects] = useState([
    {
    "id": 5,
    "name": "Show off",
    "description": "Showed off project",
    "completed": false,
    "actions": [
        {
            "id": 12,
            "project_id": 5,
            "description": "Show off to alyssa",
            "notes": "she will think im cool ",
            "completed": false
        }
    ]
}])

  useEffect(()=>{
    axios.get("http://localhost:5000/api/projects")
    .then(result=>{
      setProjects(result)
    })
    .catch(err => {
      console.log(err)
    })
  },[])

  return (
    <div className="App">
     {projects.map((project, i)=> (
       < Projects key={i} project={project} />
       ))}
    </div>
  );
}

export default App;

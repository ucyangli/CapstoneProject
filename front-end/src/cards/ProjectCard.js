import React from 'react';


const ProjectCard = ({project,deleteProject }) => {

    let url = "/project/" + project._id + '/edit';
    return(

        <tr>
            <th scope="row">{project.title}</th>
            <td>{project.status}</td>
            <td><a href={url}   className="col btn btn-primary" style={{marginRight: '10px'}}>edit</a><a className="col btn btn-primary" href={`/project`} onClick={()=> {deleteProject(project)}}>Delete</a></td>
         </tr>


        // <div className="col" >
        //     <div className="card" >
        //         <img  style={{width:'80%'}} src= {project.cover} className="card-img-top" alt="No Cover" />
        //         <div className="card-body">
        //         <h5   className="card-title">{project.title}</h5>
        //         <p  className="card-text">{project.brief}</p>
        //         <a href={url}   className="btn btn-primary">Go somewhere</a>
        //         </div>
        //     </div>
        // </div>
    )
}

export default ProjectCard;
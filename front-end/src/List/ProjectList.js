import React from 'react';
import PropTypes from 'prop-types';
import ProjectCard from '../cards/ProjectCard'

const CurrentProjectList = ({ project, deleteProject }) => {
    const emptyMessage = (
        <p>
            There is no project under this catagory yet in this lab
        </p>
    );
    

    const projectList = (
        <div>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">title</th>
                    <th scope="col">status</th>
                    <th scope="col">edit</th>
                    </tr>
                </thead>
            <tbody  className="">
                {
                    project.map((project) =>  <ProjectCard project= {project} deleteProject= {deleteProject} key= {project._id}  />)
                }
            </tbody>
         </table>
        </div>
    );
    return (
        <div>
            {project.length === 0 ? emptyMessage : projectList }
        </div>
    )
}

CurrentProjectList.propTypes = {
    project: PropTypes.array.isRequired
}

export default CurrentProjectList;
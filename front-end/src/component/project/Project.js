import React from 'react';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import CurrentProjectList from '../../List/ProjectList';
import {fetchProject, deleteProject} from '../../actions/project';


class Project extends React.Component {
    componentDidMount() {
        this.props.fetchProject();
    }


    render() {


        if(this.props.project.length >= 1 ) {
            const pjCurrent = this.props.project.filter(e=>e.status ==='current');
            const pjFuture = this.props.project.filter(e=>e.status ==='future');
            const pjPast = this.props.project.filter(e=>e.status ==='past');

            return (

                <div>
                <div className="PJCurrent my-3">
                    <h5>Current Project</h5>
                    <CurrentProjectList project = {pjCurrent} deleteProject= {this.props.deleteProject} />
                    
                </div>
                <div className="PJCurrent my-3">
                    <h5>Future Project</h5>
                    <CurrentProjectList project = {pjFuture} deleteProject= {this.props.deleteProject} />
                </div>
                <div className="PJCurrent my-3">
                    <h5>Past Project</h5>
                    <CurrentProjectList project = {pjPast} deleteProject= {this.props.deleteProject} />
    
                </div>
                <a className="mt-3" href="/NewProject"><button >add project</button></a>
                </div>
            )
        }
        return <>
        <p>There is no project</p>
        <a className="mt-3" href="/NewProject"><button >add project</button></a>
        </>;
        
        

    
  }
}

Project.propTpyes = {
    project: PropTpyes.array.isRequired,
    fetchProject: PropTpyes.func.isRequired,
    deleteProject: PropTpyes.func.isRequired
}

const mapStatetoprops = (state) => {
    return {
        project: state.project
    };
};
 
export default connect(mapStatetoprops, {fetchProject, deleteProject})(Project);
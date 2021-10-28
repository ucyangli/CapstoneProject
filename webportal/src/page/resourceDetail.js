import React, { Component } from 'react'
import projects from '../data/Project.json'
import resources from '../data/Resource.json'

import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser'


import { Link } from 'react-router-dom'




export default class ResourceDetail extends Component {
    
    
    render() {


        
        const resource = resources.find((e)=> e._id === this.props.match.params.id);
        const project = projects.filter((e)=> resource.project.includes(e._id));


        return (

            <div className='container mt-3'>
                <div className='container' style={{width:'80%'}}>
                    <h3 className='text-center my-3' id='title'>{resource.name}</h3>
                    <div className='mx-auto' style={{width:'80%'}}>
                    <img src={resource.rsimg} style={{width:'100%'}} alt=''/>
                    </div>
                    <div className='mt-5'>
                        <div>
                            {
                                parse(draftToHtml(JSON.parse(resource.detail)))
                            }
                        </div>
                    </div>
                    <div id='project' className='row mt-4'>
                    
                    {
                        project.length > 0 ? <div><h4>projects:</h4> {project.map((e)=> <Link to={'/project/'+ e._id}><p>{e.title}</p></Link>)}</div>: null
                    }
                    </div>
                </div>
                    <div className="d-grid justify-content-md-end">
                    <button className='btn btn-primary'  onClick={()=>this.props.history.goBack()}>Go Back</button>
                    </div>
                
            </div>
        )
    }
}

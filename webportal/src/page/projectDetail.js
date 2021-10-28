import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import projects from '../data/Project.json'
import members from '../data/Member.json'
import partners from '../data/Partner.json';
import resources from '../data/Resource.json';

import draftToHtml from 'draftjs-to-html';
import parse from 'html-react-parser'






export default class ProjectDetail extends Component {
    
    
    render() {


        
        const project = projects.find((e)=> e._id === this.props.match.params.id);
        const teamleader = members.find((e)=> e._id === project.teamleader);
        const teammembers = members.filter((e)=> project.member.includes(e._id));
        const supervisor = members.filter((e)=> project.supervisor.includes(e._id));
        const partner = partners.filter((e)=> project.partner.includes(e._id));
        const resource = resources.filter((e)=> project.resource.includes(e._id));
        return (

            <div className='container mt-3'>
                <div className='container' style={{width:'80%'}}>
                    <h3 className='text-center my-3' id='title'>{project.title}</h3>
                    <div className='mx-auto' style={{width:'80%'}}>
                    <img src={project.cover} style={{width:'100%'}} alt=''/>
                    </div>
                    <div className='mt-5'>
                        {/* <h4>brief:</h4> */}
                        <div>
                            {
                                parse(draftToHtml(JSON.parse(project.detail)))
                            }
                        </div>
                    </div>
                    <div id='supervisor'>
                    <h4>Academic supervisor </h4>
                    {
                        supervisor.map((e)=> <p>{e.name}</p>) 
                    }
                    </div>
                    

                    <div id='team' className='row'>
                        <div id='teamleader' className='col-6'>
                        <h4>Team Leader </h4>
                        <p>{teamleader.name}</p>
                        <p>{teamleader.email}</p>
                        </div>
                            {
                                teammembers.length > 0 ? <div id='teamMember' className='col-6'><h4>Team Members:</h4> {teammembers.map((e)=> <p>{e.name}</p>)}</div> : null
                            }
                    </div>
                    
                    {
                        partner.length > 0 ? <div><h4>Partners:</h4> {partner.map((e)=> <p>{e.name}</p>)}</div>: null
                    }

{
                        resource.length > 0 ? <div><h4>Resources:</h4> {resource.map((e)=> <Link to={'/resource/'+ e._id}><p>{e.name}</p></Link>)}</div>: null
                    }
                </div>
                <div className="d-grid justify-content-md-end">
                <button className='btn btn-primary'  onClick={()=>this.props.history.goBack()}>Go Back</button>
                </div>
            </div>
        )
    }
}

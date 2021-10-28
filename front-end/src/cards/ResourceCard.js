import React from 'react';


const ResourceCard = ({resource,deleteResource }) => {

    let url = "/resource/" + resource._id + '/edit';
    return(

        <div className="col" >
            <div className="card" >
                <img  style={{width:'100%'}} src= {resource.rsimg} className="card-img-top mx-auto" alt="No Cover" />
                <div className="card-body">
                <h5   className="card-title">{resource.name}</h5>
                <p  className="card-text">{resource.brief}</p>
                <a href={url}   className="btn btn-primary" style={{marginRight: '10px'}} >Edit</a> <a className="col btn btn-primary" href={`/resource`} onClick={()=> {deleteResource(resource)}}>Delete</a>
                </div>
            </div>
        </div>
    )
}

export default ResourceCard;
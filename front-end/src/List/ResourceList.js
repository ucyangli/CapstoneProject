import React from 'react';
import PropTypes from 'prop-types';
import ResourceCard from '../cards/ResourceCard'

const CurrentResourceList = ({ resource, deleteResource }) => {
    const emptyMessage = (
        <div>
            There is no resource yet in this lab
        </div>
    );
    

    const resourceList = (
        <div className='container'>
            <div  className="row row-cols-2 row-cols-lg-3 g-2 g-lg-3 my-3">
                {
                    resource.map((resource) =>  <ResourceCard resource= {resource} deleteResource= {deleteResource} key= {resource._id}  />)
                }
            </div>
        </div>
    );
    return (
        <div>
            {resource.length === 0 ? emptyMessage : resourceList }
        </div>
    )
}

CurrentResourceList.propTypes = {
    resource: PropTypes.array.isRequired
}

export default CurrentResourceList;
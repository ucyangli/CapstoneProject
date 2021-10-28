import React from 'react';
import {connect} from 'react-redux';
import PropTpyes from 'prop-types';
import ResourceList from '../../List/ResourceList';
import {fetchResource, deleteResource} from '../../actions/resource';


class Resource extends React.Component {
    componentDidMount() {
        this.props.fetchResource();
    }


    render() {

        if(this.props.resource.length >= 1 ) {
            return (
                <>

                <ResourceList resource = {this.props.resource}  deleteResource= {this.props.deleteResource} />
                <a className="mt-3 btn btn-primary" href="/NewResource">add new resource</a>
                </>
            )
        }
        return  <>
        <p>loading...</p>
        <a className="mt-3 btn btn-primary" href="/NewResource">add resource</a>
        </>;;
        
        

    
  }
}

Resource.propTpyes = {
    resource: PropTpyes.array.isRequired,
    fetchResource: PropTpyes.func.isRequired,
    deleteResource: PropTpyes.func.isRequired

}

const mapStatetoprops = (state) => {
    return {
        resource: state.resource
    };
};
 
export default connect(mapStatetoprops, {fetchResource, deleteResource})(Resource);
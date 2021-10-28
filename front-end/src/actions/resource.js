import {
    SET_RESOURCE,
    ADD_RESOURCE,
    VIEW_RESOURCE,
    UPDATE_RESOURCE,
    DELETE_RESOURCE
} from "../constants";



export const setResource = (resource) => {
    return {
        type: SET_RESOURCE,
        resource
    }
};

export const addResource = (resource) => {
    return {
        type: ADD_RESOURCE,
        resource
    }
};

export const viewResource = (resource) => {
    return {
        type: VIEW_RESOURCE,
        resource
    }
};

export const updateResource = (resource) => {
    return {
        type: UPDATE_RESOURCE,
        resource
    }
};

export const killResource = (resource) => {
    return {
        type: DELETE_RESOURCE,
        resource
    }
};



export const fetchResource = () => {
    return dispatch => {
        return fetch('/api/resource')
            .then(res => res.json())
            .then(data => {
                dispatch(setResource(data))
            })
    }
}
export const fetchRSDtails = (id) => {

    return dispatch => {
        return fetch(`/api/resource/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(viewResource(data))
            })
    }
}

const handleResponse = (response) => {
    if (response.ok) {
        console.log(response);
        return response.json();
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        console.log(error);
        throw error;
    }

}




export const saveResource = (data) => {
    return dispatch => {
        return fetch('/api/resource', {
                method: 'post',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(addResource(data.resource)))
    }
}

export const putResource = (data) => {
    return dispatch => {
        return fetch(`/api/resource/${data._id}`, {
                method: 'put',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(updateResource(data.resource)))
    }
}

export const deleteResource = (data) => {
    return dispatch => {

        return fetch(`/api/resource/${data._id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleResponse)
            .then(data => dispatch(killResource(data._id)))

    }
}
import {
    SET_PROJECT,
    ADD_PROJECT,
    VIEW_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT
} from "../constants";



export const setProject = (project) => {
    return {
        type: SET_PROJECT,
        project
    }
};

export const addProject = (project) => {
    return {
        type: ADD_PROJECT,
        project
    }
};

export const viewProject = (project) => {
    return {
        type: VIEW_PROJECT,
        project
    }
};

export const updateProject = (project) => {
    return {
        type: UPDATE_PROJECT,
        project
    }
};

export const killProject = (project) => {
    return {
        type: DELETE_PROJECT,
        project
    }
};



export const fetchProject = () => {
    return dispatch => {
        return fetch('/api/project')
            .then(res => res.json())
            .then(data => {
                dispatch(setProject(data))
            })
    }
}
export const fetchPJDtails = (id) => {

    return dispatch => {
        return fetch(`/api/project/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(viewProject(data))
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




export const saveProject = (data) => {
    return dispatch => {
        return fetch('/api/project', {
                method: 'post',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(addProject(data)))
    }
}

export const putProject = (data) => {
    return dispatch => {
        return fetch(`/api/project/${data._id}`, {
                method: 'put',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(updateProject(data)))
    }
}

export const deleteProject = (data) => {
    return dispatch => {

        return fetch(`/api/project/${data._id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleResponse)
            .then(data => dispatch(killProject(data._id)))

    }
}
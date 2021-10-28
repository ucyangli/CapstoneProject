import { SET_MEMBER, ADD_MEMBER,VIEW_MEMBER,UPDATE_MEMBER,DELETE_MEMBER } from "../constants";


export const setMember = (member) => {
    return {
        type: SET_MEMBER,
        member
    }
};

export const addMember = (member) => {
    return {
        type: ADD_MEMBER,
        member
    }
};

export const viewMember = (member) => {
    return {
        type: VIEW_MEMBER,
        member
    }
};

export const updateMember = (member) => {
    return {
        type: UPDATE_MEMBER,
        member
    }
};

export const killMember = (member) => {
    return {
        type: DELETE_MEMBER,
        member
    }
};
 

export const fetchMember = () => {
    return dispatch => {
        return fetch('/api/member')
        .then (res => res.json())
        .then(data => {
            dispatch(setMember(data))
        })
    }
}
export const fetchMBDtails = (id) => {
    
    return dispatch => {
        return fetch(`/api/member/${id}`)
        .then (res => res.json())
        .then(data => {
            dispatch(viewMember(data))
        })
    }
}

const handleResponse = (response) => {
    if(response.ok){
        console.log(response);
        return response.json();
    }else {
        let error = new Error(response.statusText);
        error.response = response;
        console.log(error);
        throw error;
    }

}



export  const saveMember = (data) => {

    return dispatch => {
        return fetch('/api/member',  {
            method: 'post',
            body: data,
            // body: JSON.stringify(data),
            // headers: {
            //     "Content-Type": "application/json"
            // }
        }).then(handleResponse)
            .then(data => dispatch(addMember(data.member)))
    }   
}

export const putMember = (data) => {
    return dispatch => {
        return fetch(`/api/member/${data._id}`,  {
            method: 'put',
            body: data,
            // headers: {
            //     "Content-Type": "application/json"
            // }
        }).then(handleResponse)
            .then(data => dispatch(updateMember(data.member)))
    }
}

export const deleteMember = (id) => {

    console.log(id);
    return dispatch => {
        return fetch(`/api/member/${id}`,  {
            method: 'delete',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
            .then(data => dispatch(killMember(id)))
    }
}


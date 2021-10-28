import {
    SET_PARTNER,
    ADD_PARTNER,
    VIEW_PARTNER,
    UPDATE_PARTNER,
    DELETE_PARTNER
} from "../constants";



export const setPartner = (partner) => {
    return {
        type: SET_PARTNER,
        partner
    }
};

export const addPartner = (partner) => {
    return {
        type: ADD_PARTNER,
        partner
    }
};

export const viewPartner = (partner) => {
    return {
        type: VIEW_PARTNER,
        partner
    }
};

export const updatePartner = (partner) => {
    return {
        type: UPDATE_PARTNER,
        partner
    }
};

export const killPartner = (partner) => {
    return {
        type: DELETE_PARTNER,
        partner
    }
};



export const fetchPartner = () => {
    return dispatch => {
        return fetch('/api/partner')
            .then(res => res.json())
            .then(data => {
                dispatch(setPartner(data))
            })
    }
}
export const fetchPNDtails = (id) => {

    return dispatch => {
        return fetch(`/api/partner/${id}`)
            .then(res => res.json())
            .then(data => {
                dispatch(viewPartner(data))
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




export const savePartner = (data) => {
    return dispatch => {
        return fetch('/api/partner', {
                method: 'post',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(addPartner(data.partner)))
    }
}

export const putPartner = (data) => {
    return dispatch => {
        return fetch(`/api/partner/${data._id}`, {
                method: 'put',
                body: data,
                // headers: {
                //     "Content-Type": "application/json"
                // }
            }).then(handleResponse)
            .then(data => dispatch(updatePartner(data.partner)))
    }
}

export const deletePartner = (data) => {
    return dispatch => {

        return fetch(`/api/partner/${data._id}`, {
                method: 'delete',
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(handleResponse)
            .then(data => dispatch(killPartner(data._id)))

    }
}
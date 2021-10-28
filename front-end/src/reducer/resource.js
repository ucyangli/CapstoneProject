import { ADD_RESOURCE, SET_RESOURCE, VIEW_RESOURCE, UPDATE_RESOURCE, DELETE_RESOURCE} from "../constants";


const resource = (state = [], action = {}) => {
  switch(action.type) {
    case SET_RESOURCE:
      return action.resource;
    case ADD_RESOURCE:
      return [
        ...state,
        action.resource
      ]
    case VIEW_RESOURCE:
      return  action.resource;
    case UPDATE_RESOURCE:
      return  action.resource;
    case DELETE_RESOURCE:
      return state;
    default: return state;
  }
}


export default resource; 
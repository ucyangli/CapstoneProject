import { ADD_PROJECT, SET_PROJECT, VIEW_PROJECT, UPDATE_PROJECT, DELETE_PROJECT} from "../constants";


const project = (state = [], action = {}) => {
  switch(action.type) {
    case SET_PROJECT:
      return action.project;
    case ADD_PROJECT:
      return [
        ...state,
        action.project
      ]
    case VIEW_PROJECT:
      return  action.project;
    case UPDATE_PROJECT:
      return  action.project;
    case DELETE_PROJECT:
      return state;
    default: return state;
  }
}


export default project; 
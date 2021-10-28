import { ADD_PARTNER, SET_PARTNER, VIEW_PARTNER, UPDATE_PARTNER, DELETE_PARTNER} from "../constants";


const partner = (state = [], action = {}) => {
  switch(action.type) {
    case SET_PARTNER:
      return action.partner;
    case ADD_PARTNER:
      return [
        ...state,
        action.partner
      ]
    case VIEW_PARTNER:
      return  action.partner;
    case UPDATE_PARTNER:
      return  action.partner;
    case DELETE_PARTNER:
      return state;
    default: return state;
  }
}


export default partner; 
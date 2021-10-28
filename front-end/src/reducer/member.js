import { ADD_MEMBER, SET_MEMBER, VIEW_MEMBER, UPDATE_MEMBER, DELETE_MEMBER} from "../constants";


const member = (state = [], action = {}) => {
  switch(action.type) {
    case SET_MEMBER:
      return action.member;
    case ADD_MEMBER:
      return [
        ...state,
        action.member
      ]
    case VIEW_MEMBER:
      return  action.member;
    case UPDATE_MEMBER:
      return  action.member;
    case DELETE_MEMBER:
      return state;
    default: return state;
  }
}


export default member; 
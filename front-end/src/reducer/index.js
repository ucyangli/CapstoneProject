import { combineReducers } from "redux";

import project from './project';
import member from './member';
import partner from "./partner";
import resource from './resource'

export default combineReducers({
    project,
    member,
    partner,
    resource
})
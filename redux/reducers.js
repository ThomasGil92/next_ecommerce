import {combineReducers} from 'redux'
import * as types from './actions'

const initialAdminState={}

const adminReducer = (state = initialAdminState, { type, payload }) => {
    switch (type) {
      case types.SET_ADMIN:
        return payload
      default:
        return state
    }
  }

const reducers={
    admin:adminReducer
}

export default combineReducers(reducers)
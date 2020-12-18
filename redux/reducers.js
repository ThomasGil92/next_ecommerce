import {combineReducers} from 'redux'
import * as types from './actions'

const initialAdminState={}
const initialUserState={}
const initialCartState={}

const userReducer = (state = initialUserState, { type, payload }) => {
    switch (type) {
      case types.SET_USER:
        return payload
      default:
        return state
    }
  }
const adminReducer = (state = initialAdminState, { type, payload }) => {
    switch (type) {
      case types.SET_ADMIN:
        return payload
      default:
        return state
    }
  }
const cartReducer = (state = initialCartState, { type, payload }) => {
    switch (type) {
      case types.SET_CART:
        return payload
      default:
        return state
    }
  }

const reducers={
    admin:adminReducer,
    user:userReducer,
    cart:cartReducer
}

export default combineReducers(reducers)
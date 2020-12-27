import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import tasks from '../slices/tasks'
import user from '../slices/user'

const reducer = combineReducers({
  tasks,
  user
})

const store = configureStore({
  reducer
})

export default store;
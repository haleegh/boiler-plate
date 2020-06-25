import { combineReducers } from 'redux'
import user from './user_reducer'

// 여러 기능의 리듀서들을 합침
const rootReducer = combineReducers({
  user
})

export default rootReducer
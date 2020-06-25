import Axios from 'axios'
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from '../_actions/types'

// 액션{ type: , payload: }을 리듀서((preState, action) => {nextState))에 넘김
export function loginUser(dataTosubmit) {
  const request =  Axios.post('/api/user/login', dataTosubmit)
    .then(response => response.data)

  return{
    type : LOGIN_USER,
    payload : request
  }
}

export function registerUser(dataTosubmit) {
  const request =  Axios.post('/api/user/register', dataTosubmit)
    .then(response => response.data)

  return{
    type : REGISTER_USER,
    payload : request
  }
}

export function auth() {
  const request =  Axios.get('/api/user/auth')
    .then(response => response.data)

  return{
    type : AUTH_USER,
    payload : request
  }
}
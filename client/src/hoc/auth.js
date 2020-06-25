import React, { useEffect } from 'react'
import Axios from 'axios'
import { useDispatch } from 'react-redux'
import { auth } from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {
  // null : 아무나 출입 가능 , true : 로그인한 유저만 출입 가능, false : 로그인한 유저 출입 불가
  function AuthenticationChenck(props) {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(auth()).then(response => {
        console.log(response)
        // 분기 처리 : 1. 로그인 안한 상태
        if(!response.payload.isAuth) {
          if(option) {
            props.history.push('/login')
          }
        } else {
          // 2. 로그인 한 상태
          if(adminRoute && !response.payload.isAdmin) {
            props.history.push('/')
          } else {
            // 3. 로그인한 유저가 출입 불가능한 페이지에 접근 할 때
            if(option === false) {
              props.history.push('/')
            }
          }

        }
      })
      Axios.get('/api/user/auth')
    }, [])
    return (
      <SpecificComponent />
    )
  }
  return AuthenticationChenck
}
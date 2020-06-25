import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'

function LoginPage(props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState('')
  const [Password, setPassword] = useState('')

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }
  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    // 페이지가 새로고침되는걸 방지함
    e.preventDefault()

    let body = {
      email : Email,
      password : Password
    }
    dispatch(loginUser(body)).then(response => {
      if(response.payload.loginSuccess) {
        // 로그인이 성공하면 메인페이지로 보내주기
        props.history.push('/')
      } else {
        alert('Error')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      <form style={{ display:'flex', flexDirection:'column' }} onSubmit={onSubmitHandler}>
        <lable>Email</lable>
        <input type='emial' value={Email} onChange={onEmailHandler} />
        <lable>Password</lable>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default withRouter(LoginPage)
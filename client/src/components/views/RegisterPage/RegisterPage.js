import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../../_actions/user_action'
import { withRouter } from 'react-router-dom'
               

function RegisterPage(props) {
  const dispatch = useDispatch()
  const [Email, setEmail] = useState('')
  const [Name, setName] = useState('')
  const [Password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')

  const onEmailHandler = (e) => {
    setEmail(e.currentTarget.value)
  }
  const onNameHandler = (e) => {
    setName(e.currentTarget.value)
  }

  const onPasswordHandler = (e) => {
    setPassword(e.currentTarget.value)
  }

  const onConfirmPasswordHandler = (e) => {
    setConfirmPassword(e.currentTarget.value)
  }

  const onSubmitHandler = (e) => {
    // 페이지가 새로고침되는걸 방지함
    e.preventDefault()

    if(Password !== ConfirmPassword) {
      return alert('비밀번호와 확인 비밀번호가 같아야 합니다.')
    }
    let body = {
      email : Email,
      name: Name,
      password : Password
    }
    dispatch(registerUser(body)).then(response => {
      if(response.payload.success) {
        // 로그인이 성공하면 로그인 페이지로 보내주기
        props.history.push('/login')
      } else {
        alert('회원가입을 실패 했습니다.')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      <form style={{ display:'flex', flexDirection:'column' }} onSubmit={onSubmitHandler}>
        <lable>Email</lable>
        <input type='emial' value={Email} onChange={onEmailHandler} />
        <lable>Name</lable>
        <input type='text' value={Name} onChange={onNameHandler} />
        <lable>Password</lable>
        <input type='password' value={Password} onChange={onPasswordHandler} />
        <lable>Confirm Password</lable>
        <input type='password' value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
        <br />
        <button>Login</button>
      </form>
    </div>
  )
}

export default withRouter(RegisterPage) 

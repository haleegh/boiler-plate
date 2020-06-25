import React, { useEffect } from 'react'
import Axios from 'axios'
import { withRouter } from 'react-router-dom'

function LandingPage(props) {

  useEffect(() => {
    Axios.get('/api/hello')
    .then(response => console.log(response.data))
  }, [])

  const onClickHandler = () => {
    Axios.get('/api/user/logout')
    .then(response => {
      console.log(response.data)
      if(response.data.success) {
        props.history.push('/login')
      } else {
        alert('로그아웃을 실패 했습니다.')
      }
    })
  }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:'100vh'}}>
      메인 페이지    
      <button onClick={onClickHandler}>Logout</button>
    </div>
  )
}

export default withRouter(LandingPage) 

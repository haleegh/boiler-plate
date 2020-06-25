# React

### react-router-dom

: 페이지간 이동할 때 쓰는 패키지

### Redux

: 상태(state) 관리 라이브러리

> - prop : 위(부모)에서 아래(자식)로만 이동 가능, 값을 변경하려면 부모에서 다시 변경값을 내려줘야함, immutable적 성격
> - state : prop이 아닌 그 컴포넌트 안에서 데이터를 전달하기 위해 쓰임, state가 변하면 reRendering됨, mutable적 성격

1. Redux Data Flow : 단방향, 컴포넌트 -> 액션디스패치 - 액션 - 리듀서 - 스토어 - 구독 -> 컴포넌트
2. action object : 상태를 알려줌 {type: , ...}
3. reducer : 이전 상태와 액션 객체를 받은 후 다음 상태를 반환함
4. store : 전체적인 state를 관리
5. provider : 어플리케이션과 리덕스를 연결하기 위해 hoc를 감싸주는 컴포넌트로 스토어를 넣어줘야함 <Provider store={}>
6. dispatch : 리덕스의 store를 바꿀 수 있는 유일한 방법
7. redux extension을 사용하기 위해 프로바이더 스토어에 적어줘야함
    `store={window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__()}`

*리덕스 스토어는 객체 형식으로만 받는데 function이나 promise 형태로 올 때 리덕스가 받기 위해 redux-promise랑 redux-thunk를 사용함*
---

### 클라이언트 요청시

: 주로 Axios를 이용하여 서버로 요청을 보냄, 없을땐 postman을 이용함

### CORS(CROSS-ORIGIN-RESOURCE-SHARING) 정책

: 보안을 위해 오리진끼리 쉐어를 할 때 서로 다른 포트를 갖고 있는 서버는 아무 설정없이 req를 할 수 없음
-> 해결방법 중 하나는 Proxy사용!!! react의 proxy 설명 참조

### proxy server

- User -- 포록시 서버 --> Internet
- 아이피와 데이터를 임의로 바꿔 인터넷에서 모르게 할 수 있음 => 보안 제공
- 방화벽, 웹 필터, 캐쉬데이터&공유데이터 제공 기능(더 빠른 인터넷 이용)

---

_concurrently 를 이용하여 front와 back을 한 번에 켤 수 있음 -> 사이트 참조_

---

## cssFrameWork 종류 for ReactJS

1. Material UI : 처음 쓸 때 어려움
2. React Bootstrap
3. Semantic UI
4. Ant Design : style이 깔끔하며 쓰기가 편함 but 크기가 큼
5. Materialize

- - -
### history.push('route')
: react-router-dom의 withRouter를 기반으로 작동되므로 이것을 가져와야 함

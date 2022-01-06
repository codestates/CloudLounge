1. actions, reducers에 해당 상태관리 모듈 생성
2. 상태관리 사용을 원하는 컴포넌트 페이지로 이동

2-1. 'react-redux패키지, 사용할 action함수 import'
import { useDispatch, useSelector } from 'react-redux'
import { handleLogin, changeLocation } from './actions'

2-2. useSelector를 사용하여 해당 state의 상태 확인하기
useSelector, useDispatch 모두 훅이기 때문에 컴포넌트 안에서 실행되어야함
redux 스테이트 확인하는 법 => useSelector
const isLoginState = useSelector((state) => state.isLoginReducer)
const locationState = useSelector((state) => state.locationReducer)
console.log('islogin==>>', isLoginState)
console.log('location===', locationState)

2-3. useDispatch를 사용하여 원하는 곳에서 상태변경 사용
redux dispatch로 원하는 action 사용하는법
const dispatch = useDispatch()
dispatch(handleLogin())
dispatch(changeLocation())
dispatch(handleLogin())
dispatch(changeLocation())

import { createStore, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import { rootReducer } from '../reducers'

export const store = createStore(rootReducer)

//순수 리덕스 패키지로 스테이트 콘솔 보기
//dispatch
// store.subscribe(() => {
//   console.log('login==>', store.getState())
// })

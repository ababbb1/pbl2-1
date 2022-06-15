# React에서의 상태관리
React에서의 상태는 State를 말하며, 이는 component안에서 관리된다.   
어떤 값이 동적으로 변하고 변한 값이 DOM에 반영되는 즉, 렌더링에 영향을 주는 값을 React에서는 useState와 useReducer라는 Hook을 통해 관리할 수 있다.
<br/>

React에서는 자식 컴포넌트들 간의 직접적인 데이터 전달이 불가능하고 부모 컴포넌트를 통해서만 전달이 가능하다.   
이 때문에 자손 컴포넌트가 많아질 수록 상태 관리가 매우 복잡해지며 자신이 사용하지 않는 상태를 내려받아 다시 그 자식에게 전달해 주어야 하는 경우가 생긴다.
<br/>
<br/>

<img src="https://velog.velcdn.com/images%2Fseohee0112%2Fpost%2F0884eb38-f894-48fc-9ff8-48e992bfdfad%2Fimage.png">
<br/>
전역 상태를 제공하고, 위와 같은 Props drilling 문제를 해결하기 위해 상태 관리 도구를 사용한다.

# 상태 관리 도구의 종류
* React Context + hook Context-API
* Redux, Redux Toolkit
* Mobx
* React Query
* Recoil

API를 통해 가져온 데이터를 이용해 여러 컴포넌트들을 렌더링하고 관리하기 위해
이 프로젝트에서는 Redux Toolik을 사용하고 있다.

<br/>
<br/>

# Redux, Redux Toolkit
Redux는 자바스크립트 상태관리 라이브러리이다.

## Redux의 기본개념
1. Single source of truth
  * 동일한 데이터는 항상 같은 곳에서 가지고 온다.
  * 즉, 스토어라는 하나뿐인 데이터 공간이 있다는 의미이다.
2. State is read-only
  * 리액트에서는 setState 메소드를 활용해야만 상태 변경이 가능하다.
  * 리덕스에서도 액션이라는 객체를 통해서만 상태를 변경할 수 있다.
3. Changes are made with pure functions
  * 변경은 순수함수로만 가능
  * 리듀서와 연관되는 개념
  * Store(스토어) – Action(액션) – Reducer(리듀서)

## Store, Action, Reducer의 의미와 특징

### Store (스토어)
* Store(스토어)는 상태가 관리되는 오직 하나의 공간이다.
* 컴포넌트와는 별개로 스토어라는 공간이 있어서 그 스토어 안에 앱에서 필요한 상태를 담는다.
* 컴포넌트에서 상태 정보가 필요할 때 스토어에 접근한다.

### Action (액션)
* Action(액션)은 앱에서 스토어에 운반할 데이터를 말한다.
* Action(액션)은 자바스크립트 객체 형식으로 되어있다.

### Reducer (리듀서)
* Action(액션)을 Store(스토어)에 바로 전달하는 것이 아니다.
* Action(액션)을 Reducer(리듀서)에 전달해야한다.
* Reducer(리듀서)가 주문을 보고 Store(스토어)의 상태를 업데이트하는 것이다.
* Action(액션)을 Reducer(리듀서)에 전달하기 위해서는 dispatch() 메소드를 사용해야한다.

## Redux의 장점
* 상태를 예측 가능하게 만든다. (순수함수를 사용하기 때문)
* 유지보수 (복잡한 상태 관리와 비교)
* 디버깅에 유리 (action과 state log 기록 시) → redux dev tool (크롬 확장)
* 테스트를 붙이기 용의 (순수함수를 사용하기 때문)

## Redux Toolkit
Redux 툴킷 패키지는 기존 Redux에 대한 아래 3가지 문제를 해결하기 위해 만들어졌다.
* "Redux 스토어 구성이 너무 복잡하다."
* "Redux에서 유용한 작업을 수행하려면 많은 패키지를 추가해야 한다."
* "Redux에는 너무 많은 보일러플레이트 코드(반복적인 기본 구성 코드)가 필요하다."

Redux 툴킷에는 액션 관리를 위한 redux-actions, 불변성 보존을 위한 immer, store 값을 효율적으로 핸들링하여 불필요한 리렌더링을 막기위한 reselect, 비동기 작업을 위한 thunk가 기본적으로 내장되어있다.

## Redux 툴킷 사용
Redux 툴킷 사용을 위해서 두가지 패키지가 필요하다.   
```bash
npm install @reduxjs/toolkit react-redux
```
<br/>

store를 생성하기 위한 파일을 추가한다.   
아래는 빈 Redux 저장소를 만들고 export하는 기본 코드이다.   
Redux 저장소가 생성되고 Redux Devtools 확장도 자동으로 구성된다.   
```javascript:store.js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {},
})
```
<br/>

index.js 파일에서 App 컴포넌트 태그를 Provider 태그로 감싼다.   
```javascript:index.js
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './app/store'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
```
<br/>

슬라이스를 생성하는 파일을 추가한다.   
슬라이스를 생성하려면 슬라이스를 식별하기 위한 문자열 이름, 초기 상태 값, 상태 업데이트 방법을 정의하는 하나 이상의 리듀서 함수가 필요하다. 슬라이스가 생성되면 생성된 Redux 액션 생성자와 전체 슬라이스에 대한 리듀서 기능을 내보낼 수 있다.
<br/>

Redux는 데이터 복사본을 만들고 복사본을 업데이트하여 모든 상태 업데이트를 불변적으로 작성 하도록 요구한다.   
Redux 툴킷은 immer.js 라이브러리가 내장되어 있어 createSlice와 createReducer API를 통해 불변성을 제공한다.   
   
카운터 기능을 위한 슬라이스 파일 생성 예시   
```javascript:counterSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer
```
<br/>

위의 store.js 파일에 counterSlice.js 파일에서 가져온 리듀서 함수를 추가한다.   
매개변수에 들어가는 객체의 reducer 함수가 해당 상태에 대한 모든 업데이트를 처리한다.   
```javascript
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})
```

React-Redux의 useSelector hook을 사용하여 데이터를 읽고   
useDispatch를 사용하여 작업을 전달할 수 있다.   
```javascript:Counter.js
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './counterSlice'

export function Counter() {
  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}
```
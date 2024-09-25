import { useState, useReducer } from "react";
import "./App.css";

function App() {
  //const [count, setCount] = useState(0);
  const initState = { value: 0 };
  const [state, dispatch] = useReducer(reducer, initState);
  /**
   * reducer: 상태변경을 처리하는 함수
   * initState: 초기상태
   * state: 현재 상태
   * dispatch: 특정 액션을 실행해서 상태를 업데이트하는 함수(액션전달)
   */

  function reducer(state, action) {
    /**
     * 첫 번째 파라미터: 현재 상태
     * 두 번째 파라미터: 액션 객체
     */
    switch (action.type) {
      case "INCREMENT":
        console.log(action.name);

        return { value: state.value + 1 };
      case "DECREMENT":
        return { value: state.value - 1 };
      default:
        throw new Error("정의되지 않은 액션");
    }
  }

  return (
    <>
      <div>카운트: {state.value}</div>
      <button onClick={() => dispatch({ type: "INCREMENT", name: "111" })}>
        +
      </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
    </>
  );
}

export default App;

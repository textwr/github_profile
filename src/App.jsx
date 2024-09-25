import { useReducer, useEffect } from "react";
import { SUCCESS, LOADING, ERROR } from "./const";
import "./App.css";

//리듀서는 주로 로딩 페이지 표현에 사용

function App() {
  const initState = {
    loading: false,
    error: null,
    data: null,
  };

  const repoInitState = {
    loading: false,
    error: null,
    data: null,
  };
  const [state, dispatch] = useReducer(reducer, initState);
  const [repoState, repoDispatch] = useReducer(repoReducer, repoInitState);

  useEffect(() => {
    async function getData() {
      try {
        const TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

        dispatch({ type: LOADING });
        repoDispatch({ type: LOADING });
        const response = await fetch("https://api.github.com/users/textwr", {
          headers: {
            Authorization: `token ${TOKEN}`,
            "User-Agent": "profile",
          },
        });
        const data = await response.json();
        dispatch({ type: SUCCESS, data: data });
        const repoResponse = await fetch(
          "https://api.github.com/users/textwr/repos?sort=created",
          {
            headers: {
              Authorization: `token ${TOKEN}`,
              "User-Agent": "profile",
            },
          }
        );
        const repoData = await repoResponse.json();
        repoDispatch({ type: SUCCESS, data: repoData });
        console.log(repoData);
      } catch (e) {
        dispatch({ type: ERROR, error: e.message });
        repoDispatch({ type: ERROR, error: e.message });
      }
    }
    getData();
  }, []);

  function reducer(state, action) {
    switch (action.type) {
      case SUCCESS:
        return { ...state, loading: false, data: action.data };
      case LOADING:
        return { ...state, loading: true, error: null };
      case ERROR:
        return { ...state, error: action.error, loading: false };
      default:
        throw new Error("에러");
    }
  }

  function repoReducer(state, action) {
    switch (action.type) {
      case SUCCESS:
        return { ...state, loading: false, data: action.data };
      case LOADING:
        return { ...state, loading: true, error: null };
      case ERROR:
        return { ...state, error: action.error, loading: false };
      default:
        throw new Error("에러");
    }
  }

  return (
    <>
      <div>
        <h2>내 프로필</h2>
        {/* 로딩중일때 */}
        {state.loading && repoState.loading && <p>로딩중...</p>}
        {/* 에러가 있을 때 */}
        {state.error && repoState.error && <p>{state.error}</p>}
        {/* 로딩중이 아니고 에러도 없고 데이터가 존재할 때 */}
        {!state.loading &&
          !state.error &&
          state.data &&
          !repoState.loading &&
          !repoState.error &&
          repoState.data && (
            <>
              <img src={state.data.avatar_url} alt="" />
              <p>
                <h2>이름 : {state.data.name}</h2>
              </p>
              <p>
                <h2>팔로워 : {state.data.followers}</h2>
              </p>
              <p>
                <h2>팔로우 : {state.data.following}</h2>
              </p>
              <p>
                <h2>프로젝트 리스트</h2>
              </p>
              {repoState.data.map((e, idx) => {
                return <p key={idx}>{e.name}</p>;
              })}
            </>
          )}
      </div>
    </>
  );
}

export default App;

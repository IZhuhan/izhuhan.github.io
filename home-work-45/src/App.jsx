import './App.css'
import {useDispatch} from "react-redux";
import {increment} from "./store/slices/counterSlice.js";

function App() {
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  }

  return (
    <>
      <h1>Counter: {0}</h1>
      <button onClick={handleIncrement}>Increment</button>
      <button>Decrement</button>
      <button>Reset</button>
    </>
  )
}

export default App

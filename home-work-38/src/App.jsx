import './App.css'
import Button from "./components/Button/Button.jsx";
import Input from "./components/Input/Input.jsx";

function App() {
  return (
    <div className={'column'}>
      <Input type={'text'} placeholder={'Start typing...'}/>
      <Button type={'submit'} text={'Save'}/>
    </div>
  );
}

export default App

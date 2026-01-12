import './App.css'
import UserList from "./components/UserList/UserList.jsx";
import {useState} from "react";

function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
       <UserList/>
    </div>
  )
}

export default App

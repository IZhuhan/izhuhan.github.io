import './App.css'
import {NavLink, Route, Routes} from "react-router";
import NotFound from "./components/NoFound/NotFound.jsx";
import Contact from "./components/Contact/Contact.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";

function App() {
  return (
    <>
      <nav>
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/contact">Contact</NavLink></li>
        </ul>
      </nav>

      <div>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App

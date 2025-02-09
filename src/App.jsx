import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home"
// Components for different pages

const About = () => <h1 className="flex justify-center items-center w-[100%] h-[80vh] text-5xl font-extrabold">About Page</h1>;
const Contact = () => <h1 className="flex justify-center items-center w-[100%] h-[80vh] text-5xl font-extrabold">Contact Page</h1>;

function App() {
  return (
    <Router>
      {/* <nav className="p-10">
        <ul>
          <li >
            <Link  to="/">Home</Link>
          </li>
          <li >
            <Link  to="/about">About</Link>
          </li>
          <li>
            <Link  to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;

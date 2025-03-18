import React from 'react';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
// import Header from './components/Header'
import About from './assets/components/About'
import Contact from './assets/components/Contact'
import Home from './assets/components/Home'
import Startpage from './assets/components/Startpage';
import Middlepage from './assets/components/Middlepage';
import Dashboard from './assets/components/Dashboard';
import SignUp from "./assets/components/SignUp";
import Login from './assets/components/Login';
import Dashmiddle from './assets/components/Dashmiddle';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignUp/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/Startpage" element={<Startpage/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
            <Route path="/Middlepage" element={<Middlepage/>}/>
            <Route path="/Dashboardmiddle" element={<Dashmiddle/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}



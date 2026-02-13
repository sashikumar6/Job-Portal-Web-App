import { useState } from 'react'
import './App.css'
import RegisterPage from './RegisterPage'
import LoginPage from './LoginPage'
import JoblistPage from './JoblistPage'
import ApplyjobPage from './ApplyjobPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element ={<RegisterPage/>} />
        <Route path='/login' element ={<LoginPage/>} />
        <Route path='/jobs' element ={<JoblistPage/>} />
        <Route path='/apply' element ={<ApplyjobPage/>} />
      
      </Routes>
    </BrowserRouter>
  )
}

export default App

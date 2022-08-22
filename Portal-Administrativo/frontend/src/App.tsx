import React from 'react';
import './App.css';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes></Routes>
      </BrowserRouter>
      <Route path="/" element={<HomePage />}></Route>
    </div>
  );
}

export default App;

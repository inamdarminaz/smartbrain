import React from 'react';
import './App.css';
import Naviagtion from './components/Naviagtion/Naviagtion'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'

function App() {
  return (
    <div className="App">
      <Naviagtion/>
      <Logo/>
      <ImageLinkForm />
      {/*
      <FaceRecognition />} */}
      
    </div>
  );
}

export default App;

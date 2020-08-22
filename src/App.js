import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'

const app = new Clarifai.App({
  apiKey: '6d7cc47af16c4937bd0368b567b24e12'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

class App extends React.Component {

  constructor(){
    super();
    this.state ={
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin'
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box)
    this.setState({box:box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl:this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => 
      this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
  }

  render(){
    return (
      <div className="App">
        <Particles className = 'particles'
                params={particlesOptions}
              />       
        { this.state.route=== 'signin'?
           <SignIn/> :
           <div>
           <Navigation/>
           <Logo/>
           <Rank />
           <ImageLinkForm onInputChange ={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
           <FaceRecognition box = {this.state.box} imageUrl= {this.state.imageUrl}/>
           </div>
        }
       
      </div>
    );
  }
}

export default App;

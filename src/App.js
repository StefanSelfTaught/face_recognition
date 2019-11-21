import React, { Component, Fragment } from 'react';

import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';

const app = new Clarifai.App({
  apiKey: 'c2a592af4fe14866b4572c44eb6f26e2'
});

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
};

class App extends Component {
  state = {
    input: '',
    imageUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false
  };

  calculateFaceLocation = data => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  };

  displayFaceBox = (box) => {

    this.setState({ box })

  }

  onInputChange = event => {
    // https://upload.wikimedia.org/wikipedia/commons/4/48/Outdoors-man-portrait_%28cropped%29.jpg

    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error))
  };

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    } else if (route === 'home'){
      this.setState({ isSignedIn: true })
    }
    this.setState({ route })
  }

  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
        <Particles className="particles" params={particlesOptions} />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <Fragment>
              <Rank />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </Fragment>
          : (
              route === 'signin' 
              ? <SignIn onRouteChange={this.onRouteChange} />
              : <Register onRouteChange= {this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;

import React, {Component} from 'react';
import Particles from 'react-tsparticles';
import FaceDetector from '../components/FaceDetector/FaceDetector';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import './App.css';
import {particlesOptions} from "./particlesOptions";
import {initialState} from "../states/initialState";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data._id, name: data.name, email: data.email, entries: data.entries, joined: data.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const faces = [];

    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);

    data.forEach((face) => {
      const {bounding_box} = face.region_info;
      let {bottom_row, left_col, right_col, top_row} = bounding_box;
      faces.push({
        leftCol: left_col * width,
        topRow: top_row * height,
        rightCol: width - (right_col * width),
        bottomRow: height - (bottom_row * height)
      })
    })

    return faces;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({imageUrl: event.target.value});
  }

  onButtonSubmit = async () => {
    const imgURL = this.state.imageUrl;
    const id = this.state.user.id;

    if (!imgURL) {
      alert("Link field can't be empty.");
    } else {
      try {
        let boxesResponse = await fetch('https://facediv-api.herokuapp.com//api/v1/imageURL', {
          method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({imgURL})
        })
        if (boxesResponse.status === 500) {
          alert("Something went wrong, try after some time.");
        } else {
          boxesResponse = await boxesResponse.json()

          let entriesResponse = await fetch('https://facediv-api.herokuapp.com//api/v1/increaseEntries', {
            method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({id})
          })

          if (entriesResponse.status === 500) {
            alert("Something went wrong, try after some time.");
          } else {
            entriesResponse = await entriesResponse.json();
            this.setState(Object.assign(this.state.user, {entries: entriesResponse.entries}))
          }
          this.displayFaceBox(this.calculateFaceLocation(boxesResponse))
        }
      } catch (err) {
        alert("Something went wrong, try after some time.");
      }
    }
  }

  onRouteChange = (route) => {
    if (route === 'sign-in') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    const {isSignedIn, imageUrl, route, boxes} = this.state;
    return (<div className="App">
      <Particles className='particles'
                 params={particlesOptions}
      />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' ? <div>
        <Logo/>
        <Rank
          name={this.state.user.name}
          entries={this.state.user.entries}
        />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceDetector boxes={boxes} imageUrl={imageUrl}/>
      </div> : (route === 'sign-in' ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> :
        <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>)}
    </div>);
  }
}

export default App;

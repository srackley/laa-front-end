import React, { Component } from 'react';
import logo from './LAA_Logo.png';
import districts from 'congressional-districts';
import axios from 'axios'

class App extends Component {

  state = {
    showForm: false,
    formSubmitted: false,
    showAddressForm: null,
    currentLocation: null,
  }

  onClickHandler = () => {
    this.setState({ showForm: true })
  }

  onOptionChange = (event) => {
    this.setState({
      showAddressForm: event.target.value
    })
  }

  getLocation = () => {
    const geolocation = navigator.geolocation;
    const location = new Promise((resolve, reject) => {
      if(!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition((position) => {
        resolve(this.setState({currentLocation: position.coords}));
        console.log(this.state.currentLocation)
      }, () => {
        reject (new Error('Permission denied'));
      })
    })

  }

  onSubmitHandler = (event) => {
    event.preventDefault();
    const zipCode = event.target.zipCodeField.value.startsWith('0')
    ? event.target.zipCodeField.value.slice(1)
    : event.target.zipCodeField.value
    const district = districts.getDistricts(zipCode)[0];
    const phone_number = event.target.phoneNumberField.value;
    const state = event.target.stateField.value;
    const user = {phone_number, state, district}

    axios.post('/api/v1/users', {user}).then( res => console.log('success'))

    this.setState({ formSubmitted: true });

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p><i>Your Home For Legislative Accountability</i></p>
        </header>
        <div className="App-hero">
          {this.state.showForm ?
            this.state.formSubmitted ? <h1>Submitted!</h1> :
              <form className="App-form" onSubmit={this.onSubmitHandler}>
                <h2>Sign up for SMS</h2>
                <h3>Where do you live?</h3>
                <label>
                  <input
                  type="radio"
                  id="geolocate"
                  name="location"
                  value="false"
                  checked={this.state.showAddressForm==="false"}
                  onChange={this.onOptionChange}
                  onClick={this.getLocation}
                  />
                  <span>Use Current Location</span>
                </label>
                <label>
                  <input
                  type="radio"
                  id="inputLocation"
                  name="location"
                  value="true"
                  checked={this.state.showAddressForm==="true"}
                  onChange={this.onOptionChange}
                  />
                  <span> No Thanks, I'll enter my address </span>
                </label>
              {this.state.showAddressForm === "true"
                ?
              <div>
              <input
                type="text"
                placeholder="street address"
                className="full"
                />
                <input
                type="text"
                placeholder="city"
                className="full"
                />
                <input
                type="text"
                placeholder="state" name="stateField"
                className="half left"
                />
                <input
                type="text"
                placeholder="zipcode"
                name="zipCodeField"
                className="half right"
                />
                <label>Mobile Number:</label>
                <input
                type="text"
                name="phoneNumberField"
                placeholder="###-###-####"
                className="full"
                />
                <button className="button shadow">Sign Up</button>
              </div>
              :
              null
              }
              </form> : <div>
              <p>Learn how your legislators are voting and let them know how you feel</p>
              <button onClick={this.onClickHandler} className="button shadow"> Get in the LAA Loop!</button>
              </div>
          }
          <ul className="App-blocks">
            <li>
              <p>1</p>
              <p>Sign Up</p>
            </li>
            <li>
              <p>2</p>
              <p>Find your legislators</p>
            </li>
            <li>
              <p>3</p>
              <p>Get text updates</p>
            </li>
            <li>
              <p>4</p>
              <p>Take Action</p>
            </li>
          </ul>
          <h1>Why It Matters</h1>
          <p>Commodo labore excepteur mollit non ut. Eu aliquip aute ullamco dolor. Duis commodo aliqua eu consequat proident nostrud ut ea reprehenderit esse incididunt qui exercitation. Duis ullamco reprehenderit adipisicing velit cupidatat ut cillum occaecat reprehenderit.</p>
          <h1>Why It Matters</h1>
          <p>Quis aliquip sint qui culpa Lorem cillum magna veniam. Quis dolor commodo sit consequat nisi eu laborum commodo deserunt duis eiusmod duis eiusmod. Culpa quis minim ullamco irure excepteur id elit tempor exercitation non nostrud dolore elit fugiat. Mollit enim duis incididunt cillum et nostrud eiusmod. Irure esse consequat dolore anim aute duis nisi irure excepteur tempor nostrud.</p>
        </div>
      </div>
    );
  }
}

export default App;

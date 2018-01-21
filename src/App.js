import React, { Component } from 'react';
import logo from './LAA_Logo.png';
import './App.css';

class App extends Component {

  state = {
    showForm: false,
    formSubmitted: false,
  }

  onClickHandler = () => {
    this.setState({ showForm: true })
  }

  onSubmitHander = (event) => {
    event.preventDefault();
    this.setState({ formSubmitted: true })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Your Home For Legislative Accountability</p>
        </header>
        <div className="App-hero">
          <p>Learn how your legislators are voting and let them know how you feel</p>
          {this.state.showForm ?
            this.state.formSubmitted ? <h1>Submitted!</h1> :
              <form className="App-form" onSubmit={this.onSubmitHander}>
                <h2>Sign up for SMS</h2>
                <h2>Where do you live?</h2>
                <input type="text" placeholder="street address" />
                <input type="text" placeholder="city" />
                <input type="text" placeholder="state" />
                <input type="text" placeholder="zipcode" />
                <label>Mobile Number</label>
                <input type="text" />
                <button style={{ backgroundColor: 'red', color: 'white' }}>Sign Up</button>
              </form> : <button onClick={this.onClickHandler}> Get in the LAA Loop!</button>
          }
          <ul className="App-blocks">
            <li>
              <p>1</p>
              <p>Sign Up</p>
            </li>
            <li>
              <p>2</p>
              <p>Find your legislator</p>
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

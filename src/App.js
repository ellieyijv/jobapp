import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux'
import {addApple, addAppleAsync, removeApple} from "./reducer";

class App extends Component {
  render() {

      return (
          <div>
          <button onClick={this.props.addApple}>Add Apple</button>
              <button onClick={this.props.removeApple}>Remove Apple</button>
              <button onClick={this.props.addAppleAsync}>delay to add apple</button>
          <h1>Now we have {this.props.num} apples</h1>
          </div>
      );
  }
}

const mapStatetoProps=(state)=>{
    return {num:state}
}

const actionCreators = {removeApple, addApple, addAppleAsync}
App = connect(mapStatetoProps, actionCreators )(App)
export default App;

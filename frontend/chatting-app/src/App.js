import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import Main from './components/MainComponent';
import './App.css';
import './Utils.css'
import { Provider } from 'react-redux';
import { configureStore } from './redux/configureStore'

const store = configureStore();

class App extends Component{

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>  
      </Provider>
    );
  }  

}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router} from 'react-router-dom';
import { StateProvider } from './stateprovider';
import reducer, { initialState } from './reducer';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
     primary: {
        main: "#28a746ad" // This is an orange looking color
               },
     secondary: {
        main: "#ffcc80" //Another orange-ish color
                }
           }
});
ReactDOM.render(
 
  <Router>
    <StateProvider initialState={initialState} reducer={reducer}>
    <ThemeProvider theme ={theme}>
    <App />
    </ThemeProvider>
    
    </StateProvider>
    
  </Router>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

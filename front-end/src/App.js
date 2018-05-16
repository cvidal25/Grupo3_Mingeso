import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import brace from 'brace';
import AceEditor from 'react-ace';
import { Link } from 'react-router-dom';

import 'brace/mode/python';
import 'brace/theme/monokai';


class App extends Component {

    onChange(NewValue){
        console.log('Change',NewValue);
    }

  render() {
      return <div className="App">
          <header className="App-header">
              <img src={logo} className="App-logo" alt="logo"/>
              <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
              To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          <AceEditor
              mode="python"
              theme="monokai"
              name="blah2"
              onChange={this.onChange}
              fontSize={18}
              showPrintMargin={true}
              showGutter={true}
              highlightActiveLine={true}
              value={""}
              setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
              }}/>
      </div>;
  }
}

export default App;

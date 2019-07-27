import React from 'react';
import logo from './logo.svg';
import styled from 'styled-components';

const Div = styled.div`
	display: block;
	text-align: center;
`;

const App = () => {
  return (
    <Div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        React App
      </header>
    </Div>
  );
};

export default App;

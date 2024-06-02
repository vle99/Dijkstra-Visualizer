import React from 'react';
import './App.css';
import Grid from './components/Grid/Grid';

const App = () => {
  return (
    <div className="App">
      <h1>Dijkstra's Algorithm Visualizer</h1>
      <Grid rows={25} columns={30} />
    </div>
  );
};

export default App;
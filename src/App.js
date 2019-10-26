import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Dashboard from "./Pages/Dashboard";
import './App.css';
import './assets/css/spacing.css';
import 'katex/dist/katex.min.css';
import './assets/css/user-katex.css';

function App() {
  return (
    <Router className="App">
        <Route path='/' component={Dashboard}/>
    </Router>
  );
}

export default App;

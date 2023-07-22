import React from 'App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TrainList from './component/TList';
import TrainDetails from './component/TDetails';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TrainList} />
        <Route path="/train/:trainId" component={TrainDetails} />
      </Switch>
    </Router>
  );
};

export default App;

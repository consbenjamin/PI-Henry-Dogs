import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Creator from './components/Creator/Creator';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path ='/' component={LandingPage}/>
        <Route exact path ='/home' component={Home}/>
        <Route path='/dog' component={Creator}/>
        <Route path='/home/:id' component={Detail}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;

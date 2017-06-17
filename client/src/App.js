import React, {Component} from 'react';
import './App.css';
import Footer from './components/shared/footer';
import Header from './components/shared/header';
import Dashboard from './scenes/Dashboard';
import Profile from './scenes/account/Profile';
import Login from './scenes/account/Login';
import Help from './scenes/legal/Help';
import Imprint from './scenes/legal/Imprint';
import EULA from './scenes/legal/EULA';
import PrivacyPolicy from './scenes/legal/PrivacyPolicy';
import License from './scenes/legal/License';
import NotFound from './scenes/errors/NotFound';
import { Switch, Route } from 'react-router-dom';
import NewRegister from './scenes/register/New';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Header />
          <Switch>
            <Route path='/login' component={Login}/>

            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/profile' component={Profile}/>
            <Route path="/register/new" component={NewRegister}/>


            {/* Footer links */}
            <Route path='/help' component={Help}/>
            <Route path='/imprint' component={Imprint}/>
            <Route path='/eula' component={EULA}/>
            <Route path='/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/license' component={License}/>
            <Route component={NotFound}/>
          </Switch>
          <Footer />
      </div>
    );
  }
}

export default App;

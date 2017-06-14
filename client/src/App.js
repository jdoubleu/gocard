import React, {Component} from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Dashboard from './scenes/Dashboard';
import Profile from './scenes/account/Profile';
import Help from './scenes/law&order/Help';
import Imprint from './scenes/law&order/Imprint';
import EULA from './scenes/law&order/EULA';
import PrivacyPolicy from './scenes/law&order/PrivacyPolicy';
import License from './scenes/law&order/License';
import NotFound from './scenes/errors/NotFound';
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div class="App">
          <Header />
          <Switch>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/profile' component={Profile}/>

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

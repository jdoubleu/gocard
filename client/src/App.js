import React from "react";
import {Route, Switch} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {Container} from "reactstrap";

import NotFound from "./containers/shared/errors/notFound";
import TopBar from "./containers/shared/TopBar";
import Footer from "./containers/shared/footer";
import Settings from "./containers/account/Settings";
import Legal from "./containers/legal";
import Register from "./containers/register/index";
import Registration from "./containers/account/Registration";
import Forgotten from "./containers/account/Forgotten";
import Reset from "./containers/account/Reset";
import ProtectedRoute from "./containers/shared/ProtectedRoute";
import Home from "./containers/Home";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Route component={TopBar}/>
                <Container>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/registration' exact component={Registration}/>
                        <Route path='/forgotten' exact component={Forgotten}/>
                        <Route path='/reset/' exact component={Reset}/>
                        <ProtectedRoute path='/settings' exact component={Settings}/>

                        {/* Register Routes */}
                        <ProtectedRoute path="/register" component={Register}/>

                        {/* Footer Routes */}
                        <Route path="/legal" component={Legal}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default App;

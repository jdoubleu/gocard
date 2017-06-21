import React from "react";
import "./App.css";
import Footer from "./components/shared/footer";
import TopBar from "./components/shared/topBar/topBar";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/account/Profile";
import Login from "./scenes/account/Login";
import Legal from "./scenes/legal/Legal";
import NotFound from "./scenes/errors/NotFound";
import {Route, Switch} from "react-router-dom";
import Register from "./scenes/register/Register";
import Registration from "./scenes/account/Registration";
import Reset from "./scenes/account/Reset";

import {Container} from "reactstrap";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TopBar />
                <Container>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/registration' exact component={Registration}/>
                        <Route path='/reset' exact component={Reset}/>
                        <Route path='/dashboard' exact component={Dashboard}/>
                        <Route path='/profile' exact component={Profile}/>

                        {/* Register Routes */}
                        <Route path="/register" component={Register}/>

                        {/* Footer Routes */}
                        <Route path="/legal" component={Legal}/>
                        <Route component={NotFound}/>
                    </Switch>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default App;

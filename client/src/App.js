import React from "react";
import {Route, Switch, } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {Container} from "reactstrap";

import NotFound from "./scenes/errors/NotFound";
import TopBar from "./modules/shared/topBar/topBar";
import Footer from "./modules/shared/footer";
import Dashboard from "./scenes/Dashboard";
import Profile from "./scenes/account/Profile";
import Login from "./containers/Login";
import Legal from "./scenes/legal/Legal";
import Register from "./scenes/register/Register";
import Registration from "./scenes/account/Registration";
import Reset from "./scenes/account/Reset";
import SingleChoice from "./modules/cards/SingleChoiceCard";
import MultipleChoice from "./modules/cards/MultipleChoiceCard";
import SelfValidate from "./modules/cards/SelfValidateCard";
import Input from "./modules/cards/TextInputCard";
import Feedback from "./scenes/learn/Feedback";


class App extends React.Component {
    render() {
        return (
            <div className="App">
                <TopBar />
                <Container>
                    <Switch>
                        <Route path='/' exact component={Login}/>
                        <Route path='/login' exact component={Login}/>
                        <Route path='/registration' exact component={Registration}/>
                        <Route path='/reset' exact component={Reset}/>
                        <Route path='/dashboard' exact component={Dashboard}/>
                        <Route path='/profile' exact component={Profile}/>

                        <Route path='/single' exact component={SingleChoice}/> # just for testing
                        <Route path='/multiple' exact component={MultipleChoice}/> # just for testing
                        <Route path='/self' exact component={SelfValidate}/> # just for testing
                        <Route path='/input' exact component={Input}/> # just for testing
                        <Route path='/feedback' exact component={Feedback}/> # just for testing

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

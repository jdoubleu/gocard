import React from "react";
import {Route, Switch} from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import {Container} from "reactstrap";

import NotFound from "./components/shared/errors/notFound";
import TopBar from "./containers/shared/TopBar";
import Footer from "./components/shared/footer";
import Settings from "./containers/account/Settings";
import Legal from "./components/legal";
import Register from "./components/register";
import Registration from "./containers/account/Registration";
import Reset from "./scenes/account/Reset";
import SingleChoice from "./modules/cards/SingleChoiceCard";
import MultipleChoice from "./modules/cards/MultipleChoiceCard";
import SelfValidate from "./modules/cards/SelfValidateCard";
import Input from "./modules/cards/TextInputCard";
import Feedback from "./scenes/learn/Feedback";
import ProtectedRoute from "./containers/shared/ProtectedRoute";
import Home from "./containers/Home";
import Normal from "./scenes/learn/Normal";
import Detail from "./scenes/register/Detail";
import Power from "./scenes/learn/Power";
import Exam from "./scenes/learn/Exam";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Route component={TopBar}/>
                <Container>
                    <Switch>
                        <Route path='/' exact component={Home}/>
                        <Route path='/registration' exact component={Registration}/>
                        <Route path='/reset' exact component={Reset}/>
                        <ProtectedRoute path='/settings' exact component={Settings}/>

                        <Route path='/single' exact component={SingleChoice}/> # just for testing
                        <Route path='/multiple' exact component={MultipleChoice}/> # just for testing
                        <Route path='/self' exact component={SelfValidate}/> # just for testing
                        <Route path='/input' exact component={Input}/> # just for testing
                        <Route path='/feedback' exact component={Feedback}/> # just for testing
                        <Route path='/normal' exact component={Normal}/> # just for testing
                        <Route path='/detail' exact component={Detail}/> # just for testing
                        <Route path='/power' exact component={Power}/> # just for testing
                        <Route path='/exam' exact component={Exam}/> # just for testing

                        {/* Register Routes */}
                        <ProtectedRoute path="/register" component={Register}/>

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

import React from "react";
import NotFound from "../errors/NotFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "./New";
import RegisterDetail from "./Detail";

class Register extends React.Component {
    render() {
        return (
            <Switch>
              <Route path="/register/new" exact component={NewRegister}/>
              <Route path="/register/:id" exact component={RegisterDetail}/>
              <Route component={NotFound}/>
            </Switch>
        );
    }
}
export default Register;

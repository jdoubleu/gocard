import React from "react";
import NotFound from "../errors/NotFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "./New";
import DetailRegister from "./Detail";
import EditRegister from "./Edit";

class Register extends React.Component {
    render() {
        return (
            <Switch>
              <Route path="/register/new" exact component={NewRegister}/>
              <Route path="/register/:id/edit" exact component={EditRegister}/>
              <Route path="/register/:id" exact component={DetailRegister}/>
              <Route component={NotFound}/>
            </Switch>
        );
    }
}
export default Register;

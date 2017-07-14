import React from "react";
import NotFound from "../shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "../../containers/register/New";
import DetailRegister from "../../containers/register/Detail";
import EditRegister from "./edit";
import NewCard from "../../scenes/cards/New";

const Register = () => {
    return (
        <Switch>
            <Route path="/register/new" exact component={NewRegister}/>
            <Route path="/register/:id/edit" exact component={EditRegister}/>
            <Route path="/register/:id" exact component={DetailRegister}/>
            <Route path="/register/:id/card/new" exact component={NewCard}/>
            <Route component={NotFound}/>
        </Switch>
    );
}
export default Register;

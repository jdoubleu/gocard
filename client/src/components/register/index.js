import React from "react";
import NotFound from "../shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "../../containers/register/New";
import DetailRegister from "../../containers/register/Detail";
import EditRegister from "../../containers/register/Edit";
import NewCard from "../../containers/card/New";

const Register = () => {
    return (
        <Switch>
            <Route path="/register/new" exact component={NewRegister}/>
            <Route path="/register/:registerId/edit" exact component={EditRegister}/>
            <Route path="/register/:registerId" exact component={DetailRegister}/>
            <Route path="/register/:registerId/card/new" exact component={NewCard}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Register;

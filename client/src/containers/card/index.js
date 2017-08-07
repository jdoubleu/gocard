import React from "react";
import NotFound from "../shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import DetailRegister from "./Detail";
import EditCard from "./Edit";
import NewCard from "./New";

const Register = () => {
    return (
        <Switch>
            <Route path="/register/:registerId/card/new" exact component={NewCard}/>
            <Route path="/register/:registerId/card/:cardId/edit" exact component={EditCard}/>
            <Route path="/register/:registerId/card/:cardId" exact component={DetailRegister}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Register;

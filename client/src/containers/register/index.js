import React from "react";
import NotFound from "../shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "../register/New";
import DetailRegister from "../register/Detail";
import EditRegister from "../register/Edit";
import Learn from "../learn/LearnMode";
import CardRoutes from "../card/index";

/**
 * Router for Register
 */
const Register = () => {
    return (
        <Switch>
            <Route path="/register/new" exact component={NewRegister}/>
            <Route path="/register/:registerId/edit" exact component={EditRegister}/>
            <Route path="/register/:registerId" exact component={DetailRegister}/>
            <Route path="/register/:registerId/learn" exact component={Learn}/>
            <Route path="/register/:registerId/card" component={CardRoutes}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Register;

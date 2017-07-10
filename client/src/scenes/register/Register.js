import React from "react";
import NotFound from "../../components/shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import NewRegister from "../../containers/register/NewRegister";
import DetailRegister from "../../containers/register/Detail";
import EditRegister from "./Edit";
import NewCard from "../cards/New";
class Register extends React.Component {
    render() {
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
}
export default Register;

import React from "react";
import NotFound from "../shared/errors/notFound";
import {Route, Switch} from "react-router-dom";
import Help from "./help";
import Imprint from "./imprint";
import EULA from "./eula";
import PrivacyPolicy from "./privacyPolicy";
import License from "./license";

const Legal = () => {
    return (
        <Switch>
            <Route path='/legal/help' component={Help}/>
            <Route path='/legal/imprint' component={Imprint}/>
            <Route path='/legal/eula' component={EULA}/>
            <Route path='/legal/privacy-policy' component={PrivacyPolicy}/>
            <Route path='/legal/license' component={License}/>
            <Route component={NotFound}/>
        </Switch>
    );
};

export default Legal;

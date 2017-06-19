import React from "react";
import NotFound from "../errors/NotFound";
import {Route, Switch} from "react-router-dom";
import Help from "./Help";
import Imprint from "./Imprint";
import EULA from "./EULA";
import PrivacyPolicy from "./PrivacyPolicy";
import License from "./License";

class Legal extends React.Component {
    render() {
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
    }
}
export default Legal;

import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, ButtonGroup} from "reactstrap";
import { Link } from 'react-router-dom';
import UserIcon from "../../components/shared/user/icon";

class Profile extends React.Component {

      render() {
        return (
            <div>
              <h1>Profile</h1>
              <CardGroup>
                <Card block>
                  <CardTitle>Persönliche Einstellungen</CardTitle>
                  {/* maybe zoom the icon */}
                  <UserIcon name='Frank N Stein'/>
                  {this.props.name}
                  <CardText>

                    <hr />

                    <Link to="+">Bearbeiten</Link>
                  </CardText>
                </Card>
              </CardGroup>
            </div>
        );
    }
}



Profile.defaultProps = {
   name: "Frank N Stein",
   
}

export default Profile;

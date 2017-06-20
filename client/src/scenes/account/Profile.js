import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, ButtonGroup} from "reactstrap";
import { Link } from 'react-router-dom';
import UserIcon from "../../components/shared/user/icon";
import Statistic from "../../components/shared/statistic";

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
                  <CardText>Erfolge: <Statistic /></CardText>
                </Card>
              </CardGroup>
            </div>
        );
    }
}
export default Profile;

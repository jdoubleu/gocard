import React from "react";
import {Button, Input, Row, Col} from "reactstrap";
import Icon from "../shared/user/icon";
import dummy from "../../dummyUser.json";

class AddUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addedUsers: [],
            // addedUsers: [{this.props.owner}],
            searchUsers: [],
            showSearchUsers: false,
            searchInput: ''
        };
        this.findUser = this.findUser.bind(this);
        this.addUser = this.addUser.bind(this);
        this.getUserList = this.getUserList.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    findUser(event) {
        // let search = event.target.value;

        this.setState({
            searchUsers: dummy.filter(d => {
                let isInside = true;
                this.state.addedUsers.forEach(a => {
                    if (d.id === a.id) {
                        isInside = false;
                    }
                });
                return isInside;
            }),
            showSearchUsers: event.target.value === '' ? false:true,
            searchInput: event.target.value
        });
    };

    addUser(user) {
        this.setState({
            addedUsers: this.state.addedUsers.concat(user),
            showSearchUsers: false,
            searchInput: ''
        });
    };

    deleteUser(user) {
        this.setState({
            addedUsers: this.state.addedUsers.filter(u => {
                return u.id !== user.id;
            })
        });
    };

    getUserList() {
        if (this.state.showSearchUsers) {
            return (this.state.searchUsers.map((user) => <Row key={user.id}>
              <Col>
                <Icon name={user.displayName}/> {user.displayName}
              </Col>
              <Col>
                <Input type="select" name="role" id="role">
                    <option default>Abonnent</option>
                    <option>Redakteur</option>
                    <option>Eigentümer</option>
                </Input>
              </Col>
              <Col className="text-right">
                <Button onClick={() => this.addUser(user)}>+</Button>
              </Col>
            </Row>));
        } else {
            return (this.state.addedUsers.map((user) => <Row key={user.id}>
              <Col>
                <Icon name={user.displayName}/> {user.displayName}
              </Col>
              <Col>
                <Input type="select" name="role" id="role">
                    <option default>Abonnent</option>
                    <option>Redakteur</option>
                    <option>Eigentümer</option>
                </Input>
              </Col>
              <Col className="text-right">
                <Button onClick={() => this.deleteUser(user)}>X</Button>
              </Col>
            </Row>));
        }
    }

    render() {
        return (
            <div>
                <Input type="text" value={this.state.searchInput} onChange={this.findUser} name="addUser" id="addUser"
                       placeholder="Bitte Email oder Anzeigenamen eingeben."></Input>
                {this.getUserList()}
            </div>
        );
    }
}
export default AddUser;

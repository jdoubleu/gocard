import React from "react";
import {
    Button,
    FormFeedback,
    FormGroup,
    Input,
    InputGroup,
    InputGroupButton,
    Label,
    ListGroup,
    ListGroupItem,
    UncontrolledTooltip
} from "reactstrap";
import {connect} from "react-redux";
import {searchUsers} from "../../../../actions/user";
import _ from "lodash";
import Icon from "../../../shared/user/icon";
import {Field} from "redux-form";
import roleField from "./roleField";

class InputMembers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {keyword: '', usersByKeyword: [], loading: false};

        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleRoleChange = this.handleRoleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        this.filterExistingMembers = this.filterExistingMembers.bind(this);
        this.getUserByIndex = this.getUserByIndex.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSearch = _.debounce((q) => {
        this.props.searchUser(q).then(
            res => {
                this.setState({usersByKeyword: res.response});
                this.setState({'loading': false});
            }
        )
    }, 500);

    handleRoleChange(event, index) {
        let userByKeyword = this.state.usersByKeyword;
        userByKeyword[index] = {...userByKeyword[index], role: event.target.value};
        this.setState({userByKeyword});
    }

    addUser(user) {
        this.props.fields.push({
            user: user.id,
            role: user.role ? user.role : 'subscriber'
        });
        this.setState({'keyword': ''});
    }

    filterExistingMembers() {
        return _.filter(this.state.usersByKeyword, (a) => {
            return _.findIndex(this.props.fields.getAll(), ['user', a.id]) < 0 && a.id !== this.props.userId;
        });
    }

    getUserByIndex(index) {
        return this.props.users[this.props.fields.get(index).user] || {};
    }

    render() {
        const {fields, label, disableLabel, toolTip, meta: {touched, error}, userId} = this.props;
        return (
            <FormGroup color={touched && error && 'danger'}>
                {
                    !disableLabel &&
                    <Label id={`label-${fields.name}`}>
                        {label}
                    </Label>
                }

                <InputGroup>
                    <Input type="text" name="keyword" placeholder="Mitglieder suchen" value={this.state.keyword}
                           onChange={(event) => {
                               this.handleChange(event);
                               this.setState({'loading': true});
                               this.handleSearch(event.target.value)
                           }}/>
                    <InputGroupButton>
                        <Button outline color="secondary" onClick={() => this.setState({'keyword': ''})}>x</Button>
                    </InputGroupButton>
                </InputGroup>

                <ListGroup>
                    {
                        !this.state.keyword &&
                        fields.map((user, index) =>
                            <ListGroupItem className="p-1 px-3 justify-content-between" key={`added-${index}`}>
                                <div className="col-auto">
                                    <Icon>{this.getUserByIndex(index).displayName}</Icon>
                                </div>
                                <div className="col">
                                    {this.getUserByIndex(index).displayName}
                                </div>

                                <Field
                                    name={`${user}.role`}
                                    component={roleField}
                                    label="Last Name"
                                    disabled={userId === this.getUserByIndex(index).id}
                                />

                                <Button color="danger" outline className="col-auto"
                                        disabled={userId === this.getUserByIndex(index).id}
                                        onClick={() => fields.remove(index)}>
                                    x
                                </Button>
                            </ListGroupItem>
                        )
                    }

                    {
                        this.state.keyword &&
                        !this.state.loading &&
                        this.filterExistingMembers().map((user, index) =>
                            <ListGroupItem className="p-1 px-3 justify-content-between" key={`found-${index}`}>
                                <div className="col-auto">
                                    <Icon>{user.displayName}</Icon>
                                </div>
                                <div className="col">
                                    {user.displayName}
                                </div>
                                <Input type="select" className="col mr-2"
                                       onChange={(event) => this.handleRoleChange(event, index)}>
                                    <option value="subscriber">Abonnent</option>
                                    <option value="editor">Redakteur</option>
                                    <option value="owner">Eigentümer</option>
                                </Input>
                                <Button color="primary" outline className="col-auto"
                                        onClick={() => this.addUser(user)}>+</Button>
                            </ListGroupItem>
                        )
                    }

                    {
                        this.state.keyword &&
                        !this.state.loading &&
                        this.filterExistingMembers().length <= 0 &&
                        <ListGroupItem>Kein Benutzer gefunden</ListGroupItem>
                    }

                    {
                        this.state.keyword && this.state.loading &&
                        <ListGroupItem>...</ListGroupItem>
                    }
                </ListGroup>

                {
                    touched && error &&
                    <FormFeedback>{error}</FormFeedback>
                }
                {
                    toolTip &&
                    <UncontrolledTooltip placement="right" target={`label-${fields.name}`}>
                        {toolTip}
                    </UncontrolledTooltip>
                }
            </FormGroup>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    users: state.entities.users.byId || {},
    userId: state.auth.userId,
});

const mapDispatchToProps = dispatch => ({
    searchUser: (q) => {
        return dispatch(searchUsers(q));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(InputMembers);
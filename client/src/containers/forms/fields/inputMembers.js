import React from "react";
import {Button, FormFeedback, FormGroup, Input, Label, ListGroup, ListGroupItem, UncontrolledTooltip} from "reactstrap";
import {connect} from "react-redux";
import {searchUsers} from "../../../actions/user";

import _ from "lodash";
import {clearSearchValue} from "../../../actions/ui";
import Icon from "../../../components/shared/user/icon";

const InputMembers = ({input, label, disableLabel, toolTip, type, meta: {touched, error}, searchUser, foundUsers, users, search, clearSearch}) => (
    <FormGroup color={touched && error && 'danger'}>
        {
            !disableLabel &&
            <Label id={`label-${input.name}`}>
                {label}
            </Label>
        }

        <Input value={search} placeholder={label} onChange={(event) => searchUser(event.target.value)}/>

        <ListGroup>
            {
                search !== "" &&
                _.filter(foundUsers, (u) => {
                    return !_.find(input.value, ['uid', u.uid])
                }).map(user =>
                    <ListGroupItem className="p-1 px-3 justify-content-between" key={user.uid}>
                        <div className="col-auto">
                            <Icon>{user.displayName}</Icon>
                        </div>
                        <div className="col">
                            {user.displayName}
                        </div>
                        <Input type="select" className="col mr-2" id={`role-${user.uid}`}>
                            <option value="subscriber">Abonnent</option>
                            <option value="editor">Redakteur</option>
                            <option value="owner">Eigentümer</option>
                        </Input>
                        <Button color="primary" outline className="col-auto" onClick={() => {
                            input.onChange({
                                ...input.value,
                                [user.uid]: {
                                    uid: user.uid,
                                    role: document.getElementById(`role-${user.uid}`).value
                                }
                            });
                            clearSearch();
                        }}>+</Button>
                    </ListGroupItem>
                )
            }
        </ListGroup>

        <ListGroup>
            {
                search === "" &&
                _.toArray(input.value).map(member =>
                    <ListGroupItem className="p-1 px-3 justify-content-between" key={member.uid}>
                        <div className="col-auto">
                            <Icon>{users[member.uid].displayName}</Icon>
                        </div>
                        <div className="col">
                            {users[member.uid].displayName}
                        </div>
                        <Input type="select" value={member.role} className="col mr-2"
                               onChange={(event) => input.onChange({
                                   ...input.value,
                                   [member.uid]: {...member, role: event.target.value}
                               })}>
                            <option value="subscriber">Abonnent</option>
                            <option value="editor">Redakteur</option>
                            <option value="owner">Eigentümer</option>
                        </Input>
                        <Button color="danger" outline className="col-auto" onClick={() => {
                            input.onChange(
                                _.omit(input.value, member.uid)
                            )
                        }}>x</Button>
                    </ListGroupItem>
                )
            }
        </ListGroup>
        {
            touched && error &&
            <FormFeedback>{error}</FormFeedback>
        }
        {
            toolTip &&
            <UncontrolledTooltip placement="right" target={`label-${input.name}`}>
                {toolTip}
            </UncontrolledTooltip>
        }
    </FormGroup>
);

const mapDispatchToProps = dispatch => ({
    searchUser(q){
        dispatch(searchUsers(q));
    },

    clearSearch(){
        dispatch(clearSearchValue());
    }

});

const mapStateToProps = (state, ownProps) => ({
    users: state.entities.users.byId || {},
    foundUsers: state.ui.inputMemberFields.foundUsers || [],
    search: state.ui.inputMemberFields.search || ""
});

export default connect(mapStateToProps, mapDispatchToProps)(InputMembers);
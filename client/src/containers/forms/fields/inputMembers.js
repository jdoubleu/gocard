import React from "react";
import {
    FormFeedback,
    FormGroup,
    Input,
    Label,
    UncontrolledTooltip,
    ListGroup,
    ListGroupItem,
    Button,
} from "reactstrap";
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
                    return !_.find(input.value, ['id', u.id])
                }).map(user =>
                    <ListGroupItem className="p-1 px-3 justify-content-between" key={user.id}>
                        <div className="col-auto">
                            <Icon>{user.displayName}</Icon>
                        </div>
                        <div className="col">
                            {user.displayName}
                        </div>
                        <Input type="select" className="col mr-2" id={`role-${user.id}`}>
                            <option value="subscriber">Abonnent</option>
                            <option value="editor">Redakteur</option>
                            <option value="owner">Eigentümer</option>
                        </Input>
                        <Button color="primary" outline className="col-auto" onClick={() => {
                            input.onChange({
                                ...input.value,
                                [user.id]: {
                                    id: user.id,
                                    role: document.getElementById(`role-${user.id}`).value
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
                    <ListGroupItem className="p-1 px-3 justify-content-between" key={member.id}>
                        <div className="col-auto">
                            <Icon>{users[member.id].displayName}</Icon>
                        </div>
                        <div className="col">
                            {users[member.id].displayName}
                        </div>
                        <Input type="select" value={member.role} className="col mr-2"
                               onChange={(event) => input.onChange({
                                   ...input.value,
                                   [member.id]: {...member, role: event.target.value}
                               })}>
                            <option value="subscriber">Abonnent</option>
                            <option value="editor">Redakteur</option>
                            <option value="owner">Eigentümer</option>
                        </Input>
                        <Button color="danger" outline className="col-auto" onClick={() => {
                            input.onChange(
                                _.omit(input.value, member.id)
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
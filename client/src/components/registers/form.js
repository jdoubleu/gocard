import React from "react";
import {FormGroup, Input, Label} from "reactstrap";
import AddUser from "../../components/registers/addUser";

class Form extends React.Component {

    render() {
        return (
            <div>
                <FormGroup>
                    <Label for="title">Titel</Label>
                    <Input type="text" name="title" id="title" placeholder="Titel des Registers."
                           value={this.props.title}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Beschreibung</Label>
                    <Input type="textarea" name="description" id="description"
                           placeholder="Beschreibung des Registers." value={this.props.description}></Input>
                </FormGroup>
                <FormGroup>
                    <Label for="members">Mitglieder</Label>
                    <AddUser />
                </FormGroup>
            </div>
        );
    }
}

export default Form;

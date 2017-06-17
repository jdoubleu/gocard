import React from "react";
import { Form, FormGroup, Input, Label } from 'reactstrap';
import AddUser from '../../components/registers/addUser';

class New extends React.Component {
  
    render(){
        return (
          <div class="New">
              <Form>
                <FormGroup>
                  <Label for="title">Titel</Label>
                  <Input type="text" name="title" id="title" placeholder="Titel des Registers."></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="description">Beschreibung</Label>
                  <Input type="textarea" name="description" id="description" placeholder="Beschreibung des Registers."></Input>
                </FormGroup>
                <FormGroup>
                  <AddUser />
                </FormGroup>
              </Form>
          </div>
        );
    }
}

export default New;

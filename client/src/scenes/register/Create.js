import React, {Component} from 'react';
import Icon from '../../components/shared/user/icon';
//import Card from '../../components/registers/card';
import { Button, InputGroup, Input, Container, Col, Row  } from 'reactstrap';
class Create extends Component{

    render() {
        return (
            <div>
              <h2>Neues Register erstellen</h2>

                <Container>
                  <Row className="show-grid">
                    <Col xs="8">
                      <p>Titel des Registers </p>
                      <InputGroup>
                        <Input />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs="8">
                      <p>Beschreibung </p>
                      <InputGroup>
                        <Input />
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row className="show-grid">
                    <Col xs="8">
                      <p>Benutzer hinzufügen</p>
                      <InputGroup>
                        <Input />
                      </InputGroup>
                    </Col>

                    <Col xs="8">
                      <Icon name="Dimo Bibbers"/> NAME {/*this.props.user.name*/} ROLLE  {/*this.props.role.name*/} <Button>Edit</Button>
                    </Col>

                  </Row>

                </Container>

                <Button>Erstellen</Button>
                <Button>Abbrechen</Button>

            </div>


        );
    }

}

export default Create;

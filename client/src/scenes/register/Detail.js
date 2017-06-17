import React, {Component} from 'react';
import Icon from '../../components/shared/user/icon';
import BlanCard from '../../components/registers/blankCard';
//import Card from '../../components/registers/card';
import { Button, FormGroup, Label, Input, Container, Col, Row  } from 'reactstrap';
class Detail extends Component{

    render() {
        return (
            <div>
              <h2>Register Detailansicht</h2>

                <Container>
                  <Row className="show-grid">
                    <Col xs="4">
                      <p>Beschreibung </p>
                      {/*this.props.register.description*/}
                    </Col>


                    <Col xs="4" >
                      <p>Lernen </p>
                        Tags
                    </Col>


                    <Col xs="4">
                      <p>Statistik </p>
                    </Col>

                  </Row>
                  <Row className="show-grid">

                    <Col xs="4">
                      <p>Register bearbeiten </p>
                      <Button> Edit </Button>

                    </Col>

                    <Col xs="4">
                      <p>Lernmodus </p>
                      <FormGroup check>
                        <Label check><Input type="radio" name="radio_normal" />{' '}Normal</Label>
                        <Label check><Input type="radio" name="radio_power" />{' '}Power</Label>
                        <Label check><Input type="radio" name="radio_klausur" />{' '}Klausur</Label>
                      </FormGroup>
                    </Col>


                    <Col xs="4">
                      <p>Benutzer des Registers </p>
                      <Icon name="Dimo Bibbers"/>
                      <Icon name="Zimo Tibbers"/>
                    </Col>

                  </Row>
                </Container>

                <Button>Lernen starten</Button>


                <p>Deine Karten </p>

                <BlanCard />

            </div>


        );
    }

}

export default Detail;

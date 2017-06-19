import React, {Component} from 'react';
import { Button, ButtonGroup, Card, CardGroup, CardTitle, CardText, CardDeck, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Statistic from "../../components/shared/statistic";
import RegisterCard from '../../components/cards/Card';
import Iconbar from '../../components/shared/member/iconBar';

class Detail extends Component{
    constructor (props) {
        super(props);
        this.state = { mode: [] };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({ mode });
    }

    render() {
        return (
            <div>
              <h2>Register Detailansicht</h2>
              {/*<h2>{this.props.register.title}</h2>*/}
              <CardGroup>
                <Card block>
                  <CardTitle>Beschreibung</CardTitle>
                  <CardText>Lorem ipsum si amet<hr /></CardText>

                  <CardText><Link to="+">Bearbeiten</Link></CardText>
                </Card>
                <Card block>
                  <CardTitle>Lernen</CardTitle>
                  <CardText>Tags</CardText>
                  <CardTitle>Lernmodus</CardTitle>
                  <CardText>
                    <ButtonGroup check>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(1)} active={this.state.mode === 1}>Normal</Button>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(2)} active={this.state.mode === 2}>Power</Button>
                      <Button color="secondary" onClick={() => this.onRadioBtnClick(3)} active={this.state.mode === 3}>Klausur</Button>
                    </ButtonGroup>
                  </CardText>
                  <Button  outline color="primary">Lernen starten</Button>
                </Card>
                <Card block>
                  <CardTitle>Statistik</CardTitle>
                  <CardText><Statistic /></CardText>
                  <CardTitle>Benutzer des Registers</CardTitle>
                  <CardText>
                    <Iconbar members={["Lewis", "nicki lauder", "peter maffay", "Udo", "Dimo Bibbers", "Kurt Z Hose", "Kurt Z Hose", "Kurt Z Hose"]}/>
                  </CardText>
                </Card>
              </CardGroup>
              <Row className="mt-4 ml-3">
                <Col>
                  <h4>Alle Karteikarten</h4>
                </Col>
              </Row>
              <CardDeck>
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Lorem ipsum dollor sias sa  amed " />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
                <RegisterCard question="Wir taversiert man durch einen Baum?" />
              </CardDeck>
            </div>


        );
    }

}

export default Detail;

import React from 'react';
import Header from '../../components/shared/header';
import { Button, ButtonGroup, Card, CardGroup, CardTitle, CardText, CardDeck, Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import Statistic from "../../components/shared/statistic";
import PreviewCard from '../../components/cards/previewCard';
import Iconbar from '../../components/shared/member/iconBar';
import TagViewer from '../../components/registers/tagViewer';

class Detail extends React.Component{
    constructor (props) {
        super(props);
        this.state = { mode: 1 };
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({ mode });
    }

    render() {
        return (
            <div>
                <Header
                    title="Objektorientierte Programmierung"
                />

              <CardGroup>
                <Card block>
                  <CardTitle>Beschreibung</CardTitle>
                  <CardText>Lorem ipsum si amet<hr /></CardText>

                  <CardText><Link to="3/edit">Bearbeiten</Link></CardText>
                </Card>
                <Card block className="bg-faded">
                  <CardTitle>Lernen</CardTitle>
                  <CardText>
                    <TagViewer />
                  </CardText>
                  <CardTitle>Lernmodus</CardTitle>
                  <CardText>
                    <ButtonGroup check>
                      <Button outline onClick={() => this.onRadioBtnClick(1)} active={this.state.mode === 1} color={this.state.mode === 1 ? 'primary' : 'secondary'}>Normal</Button>
                      <Button outline onClick={() => this.onRadioBtnClick(2)} active={this.state.mode === 2} color={this.state.mode === 2 ? 'primary' : 'secondary'}>Power</Button>
                      <Button outline onClick={() => this.onRadioBtnClick(3)} active={this.state.mode === 3} color={this.state.mode === 3 ? 'primary' : 'secondary'}>Klausur</Button>
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
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Lorem ipsum dollor sias sa  amed " />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
                <PreviewCard question="Wir taversiert man durch einen Baum?" />
              </CardDeck>
            </div>
        );
    }

}

export default Detail;

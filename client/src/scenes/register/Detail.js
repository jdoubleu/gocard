import React from "react";
import "./Detail.css";
import Header from "../../modules/shared/header";
import {
    Button,
    ButtonGroup,
    Card,
    CardDeck,
    CardGroup,
    CardText,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Label,
    Row
} from "reactstrap";
import {Link} from "react-router-dom";
import Statistic from "../../modules/shared/statistic";
import PreviewCard from "../../modules/cards/previewCard";
import Iconbar from "../../modules/shared/member/iconBar";
import TagViewer from "../../modules/registers/tagViewer";
import BlankPreviewCard from "../../modules/cards/blankPreviewCard";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: 1};
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({mode});
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
                        <CardText>OOP Register: Hier liegt alles zum Modul OOP1 von Prof. Dahm
                            <hr />
                        </CardText>

                        <CardText><Link to="3/edit">Bearbeiten</Link></CardText>
                    </Card>
                    <Card block className="border-top-primary">
                        <CardTitle>Lernen</CardTitle>
                        <Form>
                            <FormGroup>
                                <Label for="tags">Tags</Label>
                                <TagViewer />
                            </FormGroup>
                            <FormGroup>
                                <Label for="mode">Lernmodus</Label>
                                <ButtonGroup check>
                                    <Button outline onClick={() => this.onRadioBtnClick(1)}
                                            active={this.state.mode === 1}
                                            color={this.state.mode === 1 ? 'primary' : 'secondary'}>Normal</Button>
                                    <Button outline onClick={() => this.onRadioBtnClick(2)}
                                            active={this.state.mode === 2}
                                            color={this.state.mode === 2 ? 'primary' : 'secondary'}>Power</Button>
                                    <Button outline onClick={() => this.onRadioBtnClick(3)}
                                            active={this.state.mode === 3}
                                            color={this.state.mode === 3 ? 'primary' : 'secondary'}>Klausur</Button>
                                </ButtonGroup>
                            </FormGroup>
                            <Button block outline color="primary">Lernen starten</Button>
                        </Form>
                    </Card>
                    <Card block>
                        <CardTitle>Statistik</CardTitle>
                        <CardText>
                            <Statistic />
                        </CardText>
                        <CardTitle>Benutzer des Registers</CardTitle>
                        <CardText>
                            <Iconbar
                                members={["Lewis", "nicki lauder", "peter maffay", "Udo", "Dimo Bibbers", "Kurt Z Hose", "Kurt Z Hose", "Kurt Z Hose"]}
                            />
                        </CardText>
                    </Card>
                </CardGroup>
                <Row className="mt-4 ml-3">
                    <Col>
                        <h4>Alle Karteikarten</h4>
                    </Col>
                </Row>
                <CardDeck>
                    <BlankPreviewCard/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>
                    <PreviewCard question="Wie traversiert man durch einen Baum?"/>

                </CardDeck>
            </div>
        );
    }

}

export default Detail;

import React from "react";
import "./Detail.css";
import Header from "../../components/shared/header";
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
import Statistic from "../../components/shared/statistic";
import PreviewCard from "../../components/cards/previewCard";
import Iconbar from "../../components/shared/member/iconBar";
import TagViewer from "../../components/registers/tagViewer";
import BlankPreviewCard from "../../components/cards/blankPreviewCard";

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {mode: 1};
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.start = this.start.bind(this);
    }

    onRadioBtnClick(mode) {
        this.setState({mode});
    }

    start(){
        if(this.state.mode === 1){
            return "/normal";
        }else if(this.state.mode ===2){
            return "/power";
        }else{
            return"/exam";
        }
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
                            <Link to={this.start()}>
                            <Button block outline color="primary">Lernen starten</Button>
                            </Link>
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

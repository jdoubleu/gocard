import React from "react";
import PropTypes from "prop-types";
import Headline from "../../components/shared/headline";
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
    Row,
    UncontrolledTooltip
} from "reactstrap";
import {Link} from "react-router-dom";
import MemberBar from "./member/bar";
import TagViewer from "../../containers/register/modules/TagViewer";
import Statistic from "../shared/statistics/statistic";
import BlankPreviewCard from "../cards/blankPreviewCard";
import PreviewCard from "../cards/previewCard";
import "./Detail.css";


const detail = ({handleSubmit, register, members, mode, cards, modeSelected}) => {

    return (
        <div>
            <Headline title={register.title}/>

            <CardGroup>
                <Card block>
                    <CardTitle>Beschreibung</CardTitle>
                    <CardText>{register.description}
                        <hr/>
                    </CardText>

                    <CardText>
                        <Link to="3/edit">Bearbeiten</Link>
                    </CardText>

                </Card>
                <Card block className="border-top-primary">

                    <CardTitle>Lernen</CardTitle>
                    <Form>
                        <FormGroup>
                            <Label for="tags" id="labelTags">Tags</Label>
                            <TagViewer cards={cards} registerId={register.uid}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="mode" id="labelLernmodus" width="80px">Lernmodus</Label>
                            <ButtonGroup check>
                                <Button id="buttonNormal" outline
                                        onClick={() => modeSelected(1)} active={mode === 1}
                                        color={mode === 1 ? 'primary' : 'secondary'}>Normal
                                </Button>
                                <Button id="buttonPower" outline
                                        onClick={() => modeSelected(2)} active={mode === 2}
                                        color={mode === 2 ? 'primary' : 'secondary'}>Power
                                </Button>
                                <Button id="buttonKlausur" outline
                                        onClick={() => modeSelected(3)} active={mode === 3}
                                        color={mode === 3 ? 'primary' : 'secondary'}>Klausur
                                </Button>
                            </ButtonGroup>
                        </FormGroup>
                        <Link to={handleSubmit}>
                            <Button block outline color="primary">Lernen starten</Button>
                        </Link>
                    </Form>
                </Card>
                <Card block>
                    <CardTitle>Statistik</CardTitle>
                    <CardText>
                        <Statistic/>
                    </CardText>
                    <CardTitle >Benutzer des Registers</CardTitle>
                    <CardText>
                        <MemberBar
                            members={members}/>
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
                {
                    cards &&
                    cards.map((card) =>
                        <PreviewCard card={card}/>
                    )
                }
            </CardDeck>
            <UncontrolledTooltip placement="right" target="labelTags">
                Die Tags können ausgewählt werden, um themenbezogene Lernkarten zu erhalten. Sie können einen oder
                mehrere Tags auswählen um das Lernen zu starten. Wenn Tags nicht ausgewählt sind, werden diese nicht
                im Lernmodus berücksichtigt.
            </UncontrolledTooltip>
            <UncontrolledTooltip placement="right" target="labelLernmodus">
                Der Lernmodus muss ausgwählt werden, um die Variante des Lernens zu
                definieren. {/*  {<span> <br /> </span>} Normalmodus: Wir gehen nach und nach durch die alle Karteikarten mit den themenbezogenen Tags und fragen diese ab.*/}
            </UncontrolledTooltip>

        </div>
    );

};

detail.propTypes = {
    cards: PropTypes.array.isRequired,
    mode: PropTypes.number.isRequired,
    members: PropTypes.array.isRequired,
    register: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    modeSelected: PropTypes.func.isRequired,
};

export default detail;

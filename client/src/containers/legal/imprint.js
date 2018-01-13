import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

/**
 * Information about the organisation and the developers of this Application
 */
const Imprint = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Impressum">
                    Hier findest Du alle möglichkeiten mit uns Kontakt aufzunehmen.
                </Headline>
                <Card block>
                    <CardTitle>Contact</CardTitle>

                    <CardText className="px-2 text-justify">
                        Anschrift<br/>
                        Addresse<br/>
                        PLZ Stadt<br/>
                        <br/>
                        Telefon<br/>
                        E-Mail Address<br/>
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Entwickler Team</CardTitle>
                    <CardText className="px-2 text-justify">
                        Für das Gestaltung, Design und technische Betreuung des Webportals sind folgende Entwickler
                        verantwortlich:
                        <br/>

                    </CardText>
                    <CardText className="px-2 text-justify ml-auto mr-auto">

                        <svg width="150" height="150">
                            <circle cx="75" cy="75" r="70" stroke="grey" strokeWidth="3" fill="white"/>
                            <text x="35" y="80" fill="grey">Philipp Doll</text>
                        </svg>

                        <svg width="150" height="150">
                            <circle cx="75" cy="75" r="70" stroke="grey" strokeWidth="3" fill="white"/>
                            <text x="30" y="80" fill="grey">Timo Ribbers</text>
                        </svg>

                        <svg width="150" height="150">
                            <circle cx="75" cy="75" r="70" stroke="grey" strokeWidth="3" fill="white"/>
                            <text x="20" y="80" fill="grey">Max van Aerssen</text>
                        </svg>

                        <svg width="150" height="150">
                            <circle cx="75" cy="75" r="70" stroke="grey" strokeWidth="3" fill="white"/>
                            <text x="50" y="70" fill="grey">Joshua</text>
                            <text x="35" y="90" fill="grey">Westerheide</text>
                        </svg>

                        <svg width="150" height="150">
                            <circle cx="75" cy="75" r="70" stroke="grey" strokeWidth="3" fill="white"/>
                            <text x="20" y="80" fill="grey">Fabian Zipproth</text>
                        </svg>

                    </CardText>

                </Card>
            </Col>
        </Row>
    );
};

export default Imprint;

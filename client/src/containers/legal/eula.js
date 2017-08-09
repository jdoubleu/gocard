import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

/**
 * EULA End-User-Licence-Agreement. Provides information of the do's and don'ts for this Application
 */
const EULA = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Endnutzer Lizenz&shy;vereinbarung EULA">
                    Hier findest Du Angaben und Richtlinien für die Nutzung von GoCard.
                </Headline>
                <Card block>
                    <CardTitle>Nutzung</CardTitle>

                    <CardText className="px-2 text-justify">
                        Die Nutzung dieser Webseite ist absolut freiwillig. Es werden keine Kosten von unser Seite
                        für die Nutzung dieser Webseite erhoben. Wir haften nicht für eventuelle Unerreichbarkeit
                        der Webseite. Falls wir mitbekommen, dass du rechtswidrige Daten hochlädst, behalten wir uns
                        vor, deinen Account zusammen mit all deinen Daten zu löschen. Wir führen aber keine generelle
                        Überprüfung der
                        Daten durch.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Daten</CardTitle>
                    <CardText className="px-2 text-justify">
                        Wir haften nicht für deine Daten, sowie den Inhalt den du auf dieser Seite erstellst. Wir
                        behalten uns vor deinen Account zu löschen, falls wir mitbekommen, dass sie rechtswidrige Daten
                        über diese Seite verbreiten. Für den Verlust von Daten haften wir nicht, und kommen für keinen
                        dadurch erstandenen Schäden auf. Wir probieren unserer möglichstes um den Verlust von Daten zu
                        verhindern.
                        <br/>
                        <br/>
                        Weiteres zu dem Thema Datenschutz in dem Bereich <a href="privacy-policy">
                        Datenschutzerklärung</a>.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Eigentumsrecht</CardTitle>
                    <CardText className="px-2 text-justify">
                        Es ist dir nicht erlaubt die Software ganz oder teilweise zu verändern oder abgeleitete Werke
                        zu schaffen, die ganz oder teilweise auf der Software basieren.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Technischer Support</CardTitle>
                    <CardText className="px-2 text-justify">
                        GoCard bietet keinen technischen Support. Bei Fragen oder Problemen kannst du aber dennoch eine
                        Mail an die im Impressum hinterlegte E-Mail Adresse senden. Für die Bearbeitung oder
                        Beantwortung deiner
                        Probleme gibt es jedoch keine Garantie.
                    </CardText>
                </Card>
            </Col>
        </Row>
    );
};

export default EULA;
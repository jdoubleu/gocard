import React from "react";
import Headline from "../shared/headline";
import {Card, CardGroup, CardText, CardTitle, Col} from "reactstrap";

const PrivacyPolicy = () => {
    return (
        <div>
            <Headline title="Datenschutzerklärung"/>

            <br/>
            <br/>

            <CardGroup>
                <Col sm={{size: '10', offset: 1}}>
                    <Card block>

                        <CardTitle className="lead">
                            Allgemein
                        </CardTitle>

                        <CardText sm={{offset: 1}} className="text-left">
                            <Col sm={{offset: 0.5}} md="12">
                                Nachfolgend möchten wir Sie über unsere Datenschutzerklärung informieren. Sie finden
                                hier Informationen über die Erhebung und Verwendung persönlicher Daten bei der Nutzung
                                unserer Webseite. Wir beachten dabei das für Deutschland geltende Datenschutzrecht. Sie
                                können diese Erklärung jederzeit auf unserer Webseite abrufen. Wir weisen ausdrücklich
                                darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per
                                E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte
                                geschützt werden kann. Die Verwendung der Kontaktdaten unseres Impressums zur
                                gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei denn wir hatten zuvor
                                unsere schriftliche Einwilligung erteilt. Der Anbieter und alle auf dieser Website
                                genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe
                                ihrer Daten.
                            </Col>

                        </CardText>

                    </Card>
                </Col>

                {/*  ---------------------------------  */}

                <Col sm={{size: '10', offset: 1}}>
                    <Card block>

                        <CardTitle className="lead">
                            Personenbezogene Daten
                        </CardTitle>

                        <CardText sm={{offset: 1}} className="text-left">
                            <Col sm={{offset: 0.5}} md="12">

                                Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Auch bei einer
                                Registrierung in das Portal sind keine personenbezogenen Daten erforderlich. Wenn jedoch
                                derweil solche Angaben gemacht worden sind, ist die auf freiwilliger Basis zu sehen.
                                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.

                            </Col>
                        </CardText>

                    </Card>

                </Col>

                {/*  ---------------------------------  */}

                <Col sm={{size: '10', offset: 1}}>
                    <Card block>

                        <CardTitle className="lead">
                            Auskunftsrecht
                        </CardTitle>

                        <CardText sm={{offset: 1}} className="text-left">
                            <Col sm={{offset: 0.5}} md="12">
                                Sie haben das Recht, sich unentgeltlich über Ihrer Accountdaten zu erkundigen. Sie haben
                                das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer angegeben Daten mit Wirkung
                                für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte an den
                                Anbieter unter den Kontaktdaten im Impressum.
                            </Col>
                        </CardText>

                    </Card>
                </Col>
            </CardGroup>

        </div>
    );
};

export default PrivacyPolicy;

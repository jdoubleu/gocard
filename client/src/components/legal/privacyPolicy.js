import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

const PrivacyPolicy = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Datenschutzerklärung"/>
                <Card block>
                    <CardTitle>Allgemein</CardTitle>

                    <CardText className="px-2 text-justify">
                        Wir beachten dabei das für Deutschland geltende Datenschutzrecht. Du kannst
                        diese Erklärung jederzeit auf unserer Webseite abrufen. Wir weisen ausdrücklich
                        darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per
                        E-Mail) Sicherheitslücken aufweisen und nicht lückenlos vor dem Zugriff durch Dritte
                        geschützt werden kann. Die Verwendung der Kontaktdaten unseres Impressums zur
                        gewerblichen Werbung ist ausdrücklich nicht erwünscht, es sei denn wir hatten zuvor
                        unsere schriftliche Einwilligung erteilt. Der Anbieter und alle auf dieser Website
                        genannten Personen widersprechen hiermit jeder kommerziellen Verwendung und Weitergabe
                        deiner Daten.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Personenbezogene Daten</CardTitle>
                    <CardText className="px-2 text-justify">
                        Du kannst unsere Webseite ohne Angabe personenbezogener Daten besuchen. Auch bei einer
                        Registrierung in das Portal sind keine personenbezogenen Daten erforderlich. Wenn jedoch
                        derweil solche Angaben gemacht worden sind, ist die auf freiwilliger Basis zu sehen.
                        Diese Daten werden ohne deine ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                    </CardText>


                    <span><hr/></span>

                    <CardTitle>Datenspeicherung</CardTitle>
                    <CardText className="px-2 text-justify">
                        Deine Accountdaten werden von uns gespeichert. Des Weiteren werden alle von deinen erstellten
                        Inhalten vorbehalten und gespeichert. Deine persönlichen Lernleistungen werden gespeichert. Wir bemühen uns deine Daten
                        zu sichern können, aber keine Datenspeicherung garantieren.
                    </CardText>
                </Card>
            </Col>
        </Row>
    );
};

export default PrivacyPolicy;
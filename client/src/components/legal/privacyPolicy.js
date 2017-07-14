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
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Personenbezogene Daten</CardTitle>
                    <CardText className="px-2 text-justify">
                        Sie können unsere Webseite ohne Angabe personenbezogener Daten besuchen. Auch bei einer
                        Registrierung in das Portal sind keine personenbezogenen Daten erforderlich. Wenn jedoch
                        derweil solche Angaben gemacht worden sind, ist die auf freiwilliger Basis zu sehen.
                        Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Auskunftsrecht</CardTitle>
                    <CardText className="px-2 text-justify">
                        Sie haben das Recht, sich unentgeltlich über Ihrer Accountdaten zu erkundigen. Sie haben
                        das jederzeitige Recht, Ihre Zustimmung zur Verwendung Ihrer angegeben Daten mit Wirkung
                        für die Zukunft zu widerrufen. Zur Auskunftserteilung wenden Sie sich bitte an den
                        Anbieter unter den Kontaktdaten im Impressum.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Datenspeicherung</CardTitle>
                    <CardText className="px-2 text-justify">
                        Ihre Accountdaten werden von uns gespeichert. Desweitern werden alle von deinen Erstellten
                        Inhalten
                        gespeichert. Deine persönlichen lernleistungen werden gespeichert.
                    </CardText>
                </Card>
            </Col>
        </Row>
    );
};

export default PrivacyPolicy;
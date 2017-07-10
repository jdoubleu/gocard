import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

const PrivacyPolicy = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Endnutzer-Linzenzvereinbarung- EULA"/>
                <Card block>
                    <CardTitle>Nutzung</CardTitle>

                    <CardText className="px-2 text-justify">
                        Die Nutzung dieser Webseite ist absolut freiwillig. Es werden keine Kosten von uns
                        für die Nutzung dieser Webseite erhoben. Wir haften nicht für eventuelle unerreichbarkeit
                        der Webseite. Falls wir sehen das sie Rechtswiedrige Daten hochladen behalten wir uns vor ihren
                        Account samt allen Daten zu Löschen.

                        Die Software darf nicht vervielfältigt werden, weitergeben werden oder dekompiliert werden(d.h. in den Quellcode übersetzt) werden.
                        Es ist ihnen nicht erlaubt die Software ganz oder teilweise zu verändern oder abgeleitete Werke zu schaffen,
                        die ganz oder teilweise auf der Software basieren.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Daten</CardTitle>
                    <CardText className="px-2 text-justify">
                        Wir haften nicht für ihre Daten, sowie den Inhalt den sie auf dieser Seite erstellen,
                        jedoch behalten wir uns vor ihren Account zu löschen falls wir sehen, dass sie Rechtswiedrige Daten
                        über diese Seite verbreiten. Für den verlust von Daten haften wir nicht. Wir probieren unserer möglichstes
                        um den Verlust von Daten zu verhindern.
                        Weiters zum Thema Datenschutz in dem Bereich Datenschutz
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Eigentumsrecht</CardTitle>
                    <CardText className="px-2 text-justify">
                        Alle Rechte liegen bei den im Impressum genannten Personen. Durch bestätigung der EULA
                        erhalten sie jediglich ein Nutzungsrecht an der Software.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Lernen</CardTitle>
                    <CardText className="px-2 text-justify">
                        Wir haften nicht für das von ihnen erziehlte lernergebnis. Wir bieten ihnen nur eine
                        Umgebung für ihr lernen
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Geltendes Recht und Gerichtsstand</CardTitle>
                    <CardText className="px-2 text-justify">
                        Für diese EULA gilt das Recht des Landes Deutschland.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Technischer Support</CardTitle>
                    <CardText className="px-2 text-justify">
                        GoCard bietet keinen technischen Support, bei Fragen oder Problemen können sie aber dennoch eine Mail an die
                        im Impressum hinterlegte E-Mail Adresse senden. Für die Bearbeitung oder Beantwortung ihres Problems gibt es jedoch keine
                        Garantie.
                    </CardText>
                </Card>
            </Col>
        </Row>
    );
};

export default PrivacyPolicy;
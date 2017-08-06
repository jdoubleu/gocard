import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row, Table} from "reactstrap";

const License = () => {

    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Lizenz"/>
                <Card block>
                    <CardTitle>Bilder und Grafiken</CardTitle>
                    <CardText className="px-2 text-justify">
                        Der Nutzer dieser Web-Portal ist dazu angehalten, keine eigenen oder externe Bilder oder Grafiken auf diesem Portal zu publizieren.
                        Wir können keine Kontrolle auf diese Dateien vornehmen, daher ist dies untersagt.
                        Die Grafiken, wie das Favicon und das Logo, sind in Produktion des Teams GoCard erstellte Dateien, die geschützt und nicht bearbeitet werden dürfen.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Text</CardTitle>
                    <CardText className="px-2 text-justify">
                        Alle Texte wurden vom GoCard Team erstellt.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Textformatierung / Schriftart </CardTitle>
                    <CardText className="px-2 text-justify">
                        Das Portal wurde mit den Schriftarten "Montserrat" und "Roboto" ausgestattet. "Montserrat" ist unter der
                        "Open Font License" veröffentlich worden und kann als öffentliche Schriftart genutzt werden. Die "Roboto" Schriftart ist unter der
                        "Apache License Version 2.0" veröffentlich worden. auch diese Schriftart wurde für den öffentlichen Verbrauch freigegben. Beide Schriftarten
                        können mit üblichen Textformatierung ausgestattet werden.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Externe Lizenzen</CardTitle>

                    <Table responsive className="mt-2 mb-3">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Webseite</th>
                            <th>Lizenztext</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        </tbody>
                    </Table>

                    <span>© copyright 2017 - GoCard Team</span>
                </Card>
            </Col>
        </Row>
    );
};

export default License;

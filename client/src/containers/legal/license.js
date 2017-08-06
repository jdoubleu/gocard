import React from "react";
import Headline from "../shared/headline";
import {
    Card,
    CardText,
    CardTitle,
    Col,
    ListGroup,
    ListGroupItem,
    ListGroupItemHeading,
    ListGroupItemText,
    Row
} from "reactstrap";
import externalLicense from "./license.json";


const License = () => {


    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Lizenz"/>
                <Card block>
                    <CardTitle>Bilder und Grafiken</CardTitle>
                    <CardText className="px-2 text-justify">
                        Der Nutzer dieser Web-Portal ist dazu angehalten, keine eigenen oder externe Bilder oder
                        Grafiken auf diesem Portal zu publizieren.
                        Wir können keine Kontrolle auf diese Dateien vornehmen, daher ist dies untersagt.
                        Die Grafiken, wie das Favicon und das Logo, sind in Produktion des Teams GoCard erstellte
                        Dateien, die geschützt und nicht bearbeitet werden dürfen.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Text</CardTitle>
                    <CardText className="px-2 text-justify">
                        Alle Hinweise, Beschreibungen und andere Texte dieses Portals sind durch das GoCard Team
                        erstellt worden. Diese Texte können unter der "Zitat-Regelung",
                        die in Deutschland allgemein gilt, Auszüge oder Abschnitte zitiert werden. Eine komplette Kopie
                        aller Texte ist nicht zulässig.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Textformatierung / Schriftart </CardTitle>
                    <CardText className="px-2 text-justify">
                        Das Portal wurde mit den Schriftarten "Montserrat" und "Roboto" ausgestattet. "Montserrat" ist
                        unter der
                        "Open Font License" veröffentlich worden und kann als öffentliche Schriftart genutzt werden. Die
                        "Roboto" Schriftart ist unter der
                        "Apache License Version 2.0" veröffentlich worden. auch diese Schriftart wurde für den
                        öffentlichen Verbrauch freigegeben. Beide Schriftarten
                        können mit üblichen Textformatierung ausgestattet werden.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Externe Lizenzen</CardTitle>


                    <ListGroup>
                        {
                            externalLicense.map((license) =>
                                <ListGroupItem key={license.name}>
                                    <ListGroupItemHeading>{license.name}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        <ul>
                                            <li>Webseite: {license.webpage}</li>
                                            <li>Lizenzname: {license.license.name } </li>
                                            <li>Lizenztext: {license.license.content} </li>
                                            <li>Lizenz-URL: {license.license.url} </li>
                                            <li>Autor: {license.authors} </li>
                                        </ul>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            )
                        }
                    </ListGroup>
                    <br />
                    <span>© copyright 2017 - GoCard Team</span>
                </Card>
            </Col>
        </Row>
    );
};

export default License;

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
import backendLicenses from "./backend_licenses.json";
import frontendLicenses from "./frontend_licenses.json";

/**
 * Provides Information about the Licences that were used for this Application
 */
const License = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Lizenz">
                    Was wurde für die Erstellung von GoCard verwendet?
                </Headline>
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

                    <CardTitle>Lizenzen verwendter Libraries</CardTitle>
                    <ListGroup>
                        {
                            Object.keys(backendLicenses.dependencies).map((key) =>
                                <ListGroupItem key={key}>
                                    <ListGroupItemHeading>{key}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        <ul>
                                            <li>Lizenz: {backendLicenses.dependencies[key].license[0]} </li>
                                            <li>Version: {backendLicenses.dependencies[key].version} </li>
                                        </ul>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            )
                        }
                        {
                            Object.keys(frontendLicenses).map((key) =>
                                <ListGroupItem key={key}>
                                    <ListGroupItemHeading>{key}</ListGroupItemHeading>
                                    <ListGroupItemText>
                                        <ul>
                                            <li>Lizenz: {frontendLicenses[key].licenses} </li>
                                            <li>Publisher: {frontendLicenses[key].publisher} </li>
                                        </ul>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            )
                        }
                    </ListGroup>
                    <br/>
                    <span>© copyright 2017 - GoCard Team</span>
                </Card>
            </Col>
        </Row>
    );
};

export default License;

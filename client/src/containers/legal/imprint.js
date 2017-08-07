import React from "react";
import Headline from "../shared/headline";
import {Card, CardText, CardTitle, Col, Row} from "reactstrap";

const Imprint = () => {
    return (
        <Row>
            <Col sm={12} md={{size: 10, offset: 1}}>
                <Headline title="Impressum">
                    Hier findest Du alle möglichkeiten mit uns Kontakt aufzunehmen.
                </Headline>
                <Card block>
                    <CardTitle>Kontakt</CardTitle>

                    <CardText className="px-2 text-justify">
                        Hochschule Düsseldorf - University of Applied Science <br/>
                        Universitätsstraße Geb. 23.31/32 <br/>
                        D 40225 Düsseldorf <br/>
                        <br/>
                        Telefon: +49 211 4351 0 <br/>
                        Telefax: +49 211 811 4916 <br/>
                        E-Mail: feedback@gocard.de<br/>
                        <br/>
                        Die Hochschule Düsseldorf ist eine Körperschaft des Öffentlichen Rechtes. Sie wird durch
                        die Präsidentin, <br/> Prof. Dr. Brigitte Grass, gesetzlich vertreten.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Zuständige Aufsichtsbehörde</CardTitle>
                    <CardText className="px-2 text-justify">
                        Ministerium für Wissenschaft und Forschung des Landes Nordrhein-Westfalen<br/>
                        Völklinger Straße 49<br/>
                        D 40221 Düsseldorf<br/>
                        <br/>
                        Telefon: +49 211 896 04<br/>
                        Telefax: +49 211 896 4555<br/>
                        <br/>
                        Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE-119432315
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Haftungshinweis</CardTitle>
                    <CardText className="px-2 text-justify">
                        Die HS Düsseldorf hat keinen Einfluss auf Gestaltung und Inhalte fremder Internetseiten.
                        Für die Inhalte von Internetseiten, auf die externe Links verweisen, übernimmt die HS
                        Düsseldorf deshalb keine Verantwortung.
                    </CardText>

                    <span><hr/></span>

                    <CardTitle>Redaktion, Gestaltung und technologische Betreuung</CardTitle>
                    <CardText className="px-2 text-justify">
                        Für die Betreuung des Internetangebotes der Fachbereiche und Einrichtungen der HS
                        Düsseldorf liegt die Verantwortung in den jeweiligen Fachbereichen und Einrichtungen.
                    </CardText>
                </Card>
            </Col>
        </Row>
    );
};

export default Imprint;

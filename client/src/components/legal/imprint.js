import React from "react";
import Headline from "../shared/headline";
import {
  Card,
  CardGroup,
  CardText,
  CardTitle,
  Col,
} from "reactstrap";

const Imprint = () => {
    return (
        <div>
            <Headline title="Impressum"/>

            <br/>
            <br/>

            <CardGroup>
              <Col sm={{size: '10',offset: 1}}>
                <Card block>

                  <CardTitle className="lead">
                    Kontakt
                  </CardTitle>

                  <CardText sm={{offset: 1}} className="text-left">
                    <Col sm={{offset: 0.5}} md="12">

                      Hochschule Düsseldorf - University of Applied Science <br />
                      Universitätsstraße Geb. 23.31/32 <br />
                      D 40225 Düsseldorf <br />
                      <br />
                      Telefon: +49 211 4351 0 <br />
                      Telefax: +49 211 811 4916 <br />
                      E-Mail: feedback@5code.de<br />
                      <br />
                      Die Hochschule Düsseldorf ist eine Körperschaft des Öffentlichen Rechtes. Sie wird durch die Präsidentin, <br /> Prof. Dr. Brigitte Grass, gesetzlich vertreten.

                    </Col>

                  </CardText>

                </Card>
              </Col>

              {/*  ---------------------------------  */}

              <Col sm={{size: '10',offset: 1}}>
                <Card block>

                  <CardTitle className="lead">
                    Zuständige Aufsichtsbehörde
                  </CardTitle>

                  <CardText sm={{offset: 1}} className="text-left">
                    <Col sm={{offset: 0.5}} md="12">

                      Ministerium für Wissenschaft und Forschung des Landes Nordrhein-Westfalen<br />
                      Völklinger Straße 49<br />
                      D 40221 Düsseldorf<br />
                      <br />
                      Telefon: +49 211 896 04<br />
                      Telefax: +49 211 896 4555<br />
                      <br />
                      Umsatzsteuer-Identifikationsnummer gemäß §27a Umsatzsteuergesetz: DE-119432315

                    </Col>
                  </CardText>

                </Card>

              </Col>

              {/*  ---------------------------------  */}

              <Col sm={{size: '10',offset: 1}}>
                <Card block>

                  <CardTitle className="lead">
                    Haftungshinweis
                  </CardTitle>

                  <CardText sm={{offset: 1}} className="text-left">
                    <Col sm={{offset: 0.5}} md="12">
                      Die HS Düsseldorf hat keinen Einfluss auf Gestaltung und Inhalte fremder Internetseiten. Für die Inhalte von Internetseiten, auf die externe Links verweisen, übernimmt die HS Düsseldorf deshalb keine Verantwortung.
                    </Col>
                  </CardText>

                </Card>
              </Col>

              {/*  ---------------------------------  */}

              <Col sm={{size: '10',offset: 1}}>
                <Card block>

                  <CardTitle className="lead">
                    Redaktion, Gestaltung und technologische Betreuung
                  </CardTitle>

                  <CardText sm={{offset: 1}} className="text-left">
                    <Col sm={{offset: 0.5}} md="12">
                      Für die Betreuung des Internetangebotes der Fachbereiche und Einrichtungen der HS Düsseldorf liegt die Verantwortung in den jeweiligen Fachbereichen und Einrichtungen.
                    </Col>
                  </CardText>

                </Card>
              </Col>
            </CardGroup>

        </div>
    );
};

export default Imprint;

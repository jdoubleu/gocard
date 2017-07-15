import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import CardForm from "../forms/Card";

class New extends React.Component {
    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neue Karteikarte">
                    Hier kannst du eine neue Karteikarte für Dein Register erstellen.
                </Headline>

                <Card block>
                    <CardForm submitLabel="Erstellen"/>
                </Card>
            </Col>
        )
    }
}

export default New;
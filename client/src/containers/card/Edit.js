import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import CardForm from "../forms/Card";

class Edit extends React.Component {
    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neue Karteikarte">
                    Hier kannst du eine neue Karteikarte für Dein Register erstellen.
                </Headline>

                <Card block>
                    <CardForm submitLabel="Speichern"/>
                </Card>
            </Col>
        )
    }
}

export default Edit;
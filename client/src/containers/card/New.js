import React from "react";
import {Card, Col} from "reactstrap";
import Headline from "../../components/shared/headline";
import CardForm from "../forms/Card";
import _ from "lodash";
import {addCard} from "../../actions/card";

class New extends React.Component {

    handleSubmit = (values, dispatch) => {
        const content = values.type === 'single-choice' || 'multiple-choice' ? values.content_choice : values.content_text;
        const body = {..._.omit(values, ['content_choice', 'content_text']), content};
        return dispatch(addCard(this.props.match.params.registerId, body));
    };

    render() {
        return (
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neue Karteikarte">
                    Hier kannst du eine neue Karteikarte für Dein Register erstellen.
                </Headline>

                <Card block>
                    <CardForm handleSubmit={this.handleSubmit} submitLabel="Erstellen"/>
                </Card>
            </Col>
        )
    };
}

export default New;
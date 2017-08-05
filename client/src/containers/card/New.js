import React from "react";
import {Card, Col, Row} from "reactstrap";
import Headline from "../../components/shared/headline";
import CardForm from "../forms/Card";
import _ from "lodash";
import {addCard} from "../../actions/card";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import {push} from "react-router-redux";

const New = ({match, userId}) => {

    const handleSubmit = (values, dispatch) => {
        const body = {
            ..._.omit(values, ['content_choice', 'content_text']),
            content: values.content,
            author: userId,
            crdate: moment().format(),
            tags: values.tags
        };
        return dispatch(addCard(match.params.registerId, body)).then(success =>
            dispatch(push(`/register/${match.params.registerId}`)));
    };

    return (
        <Row>
            <Col sm="12" md={{size: 8, offset: 2}}>
                <Headline title="Neue Karteikarte">
                    Hier kannst du eine neue Karteikarte für Dein Register erstellen.
                </Headline>

                <Card block>
                    <CardForm onSubmit={handleSubmit} submitLabel="Erstellen" cancelRoute="/" cancelLabel="Abbrechen"/>
                </Card>
            </Col>
        </Row>
    )
};

New.propTypes = {
    userId: PropTypes.number.isRequired
};

function mapStateToProps(state) {
    return {
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps)(New);

import React from "react";
import PropTypes from "prop-types";
import {Card, Col, Row} from "reactstrap";
import Headline from "../../components/shared/headline";
import CardForm from "../forms/Card";
import {connect} from "react-redux";

class Edit extends React.Component {
    handleSubmit = (values, dispatch) => {
        return null;
    };

    render() {
        const {card} = this.props;
        return (
            <Row>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Headline title="Karteikarte bearbeiten">
                        Hier kannst du deine Karteikarte für Dein Register bearbeiten.
                    </Headline>

                    <Card block>
                        <CardForm onSubmit={this.handleSubmit} initialValues={card} submitLabel="Speichern"/>
                    </Card>
                </Col>
            </Row>
        )
    }
}

Edit.propTypes = {
    cardId: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => ({
    card: state.entities.cards.byId[ownProps.match.params.registerId] || {},
});

const mapDispatchToProps = (dispatch) => ({
    loadCard: dispatch()
});

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
import React from "react";
import {CardText, Col} from "reactstrap";
import {Link} from "react-router-dom";

/**
 * Is used as Link for new Register.
 */
const BlankCard = () => {
    return (
        <Col xl="4" md="6" xs="12" className="fade-in">
            <Link className="card card-block btn btn-block btn-outline-secondary mb-2" to="/register/new">
                <CardText className="display-1">+</CardText>
                <h4>Neues Register</h4>
            </Link>
        </Col>
    );
};

export default BlankCard;

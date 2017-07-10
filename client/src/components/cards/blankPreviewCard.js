import React from "react";
import {CardText, Col} from "reactstrap";
import {Link} from "react-router-dom";

class BlankPreviewCard extends React.Component {
    render() {
        return (
            <Col xl="4" md="6" xs="12">
                <Link className="card btn btn-block btn-outline-secondary mb-2" to="/register/:id/card/new">
                    <CardText className="display-1">+</CardText>
                    <h4>Neue Karteikarte</h4>
                </Link>
            </Col>

        );
    }
}


export default BlankPreviewCard;

import React from "react";
import { Card, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

class BlankCard extends React.Component{
    render() {
        return (
          <Col md="4">
              <Card className="text-center">
                <Link to="/register/new">
                  <p className="display-1">+</p>
                  <p>Erstellen</p>
                </Link>
              </Card>
            </Col>
        );
    }
}

export default BlankCard;

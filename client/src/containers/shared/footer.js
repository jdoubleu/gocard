import React from "react";
import {Link} from "react-router-dom";
import {Container} from "reactstrap";

/**
 * Footer link row
 */
const Footer = () => {
    return (
        <div className="text-center mb-3">
            <Container className="text-muted">
                <hr/>
                <Link to="/legal/help">Hilfe</Link>
                <span> | </span>
                <Link to="/legal/eula">EULA</Link>
                <span> | </span>
                <Link to="/legal/privacy-policy">Datenschutzerklärung</Link>
                <span> | </span>
                <Link to="/legal/imprint">Impressum</Link>
                <span> | </span>
                <Link to="/legal/license">Lizenz</Link>
            </Container>
        </div>

    )
};

export default Footer;

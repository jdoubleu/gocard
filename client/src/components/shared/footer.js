import React from "react";
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap';
class Footer extends React.Component {

    render(){
        return (
            <div className="text-center">
                <Container>
                    <hr />
                    <Link to="/help">Hilfe</Link>
                    <span> | </span>
                    <Link to="/eula">EULA</Link>
                    <span> | </span>
                    <Link to="/privacy-policy">Datenschutzerklärung</Link>
                    <span> | </span>
                    <Link to="/imprint">Impressum</Link>
                    <span> | </span>
                    <Link to="/license">Lizenz</Link>
                </Container>
            </div>

        );
    }

}
export default Footer;

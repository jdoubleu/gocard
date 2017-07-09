import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {Alert, Button, Card, CardGroup, CardText, CardTitle, Col, Form, FormGroup, Input} from "reactstrap";
import Logo from "../shared/logo/index";

const Login = ({onLocalLoginClick, isLocalLoginFetching, message}) => {

    const handleClick = (event) => {
        event.preventDefault();
        const creds = {
            email: event.target.email.value.trim(),
            password: event.target.password.value.trim()
        };
        onLocalLoginClick(creds);
    };

    return (

      <div>
        <Col>
         <Col sm={{size: '10', offset: 1 }} md="10" className="lead">
           <h1 className="display-4"> Willkommen bei  <Logo/> </h1>
           <hr/>
           Auf dieser Webseite hast du die Möglichkeit, online mit Karteikarten zu lernen. Du kannst deine Karteikarten in Registern verwalten und deine Register mit Freunden teilen.
         </Col>

         <br/>
         <br/>

         <CardGroup>
           <Card block>
             <CardTitle>
               <span className="text-muted">Anmelden</span> HSD-Account</CardTitle>

             <Col sm={{offset: 0.5}} md="11">
               <CardText className="text-left">

                 Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem Hochschul-Account anzumelden.

               </CardText>

               <CardText>
                 <a href="http://passport.hs-duesseldorf.de/default.aspx"> Passwort vergessen?</a>
               </CardText>
               <div className="text-left">
                 <Button outline color="primary"><a href="https://idp.fh-duesseldorf.de/idp/Authn/UserPassword">Anmelden mit HSD-Account</a></Button>


               </div>
             </Col>
           </Card>
           <Col sm="1">

           </Col>

           <Card block>
             <CardTitle>
               <span className="text-muted">Anmelden</span> GoCard-Account</CardTitle>
             <CardText>
               <Col sm={{offset: 0.5}} md="11">
                 Du hast noch keinen GoCard-Account?
                 <br/>
                 <Link to="/registration">GoCard-Account erstellen</Link>
               </Col>
             </CardText>
             {message &&
                <Alert color="danger">
                    <strong>{message}</strong>
                </Alert>
              }
             <Form onSubmit={handleClick}>
               <Col>
                 <FormGroup>
                   <Input type="email" name="email" id="email" placeholder="E-Mail Adresse"/>
                 </FormGroup>
                 <FormGroup>
                   <Input type="password" name="password" id="password" placeholder="Passwort"/>
                 </FormGroup>
                 <CardText>
                   <Link to="/reset">Passwort vergessen?</Link>
                 </CardText>
                 <div className="text-left">
                   <Button disabled={isLocalLoginFetching} outline block color="primary">Anmelden mit GoCard-Account</Button>
                 </div>
               </Col>
             </Form>
           </Card>
         </CardGroup>
       </Col>
      </div>



    );
};

Login.propTypes = {
    onLocalLoginClick: PropTypes.func.isRequired,
    isLocalLoginFetching: PropTypes.bool.isRequired,
    message: PropTypes.string
};

export default Login;

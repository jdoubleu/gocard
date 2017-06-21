import React from "react";
import {Link} from "react-router-dom";
import {Button, Card, CardGroup, CardText, CardTitle, Form, FormGroup, Input} from "reactstrap";
import Logo from '../../components/shared/logo/logo';
import Api from '../../lib/ApiClient';

class Login extends React.Component {

    constructor(props) {
      super(props);

      this.loginGoCard = this.loginGoCard.bind(this);
      this.loginHSD = this.loginHSD.bind(this);
      this.api = new Api.ApiClient("http://localhost/api/v1");
    }

    loginGoCard(event) {

      this.api.loginUser({
          email: event.target.email.value,
          password: event.target.password.value
      }).then(res => {
          console.log(res.body);
      });

      event.preventDefault();
    };

    loginHSD(event) {

    };

    render() {
        return (
            <div>
                <h1 className="display-4">Willkommen bei <Logo/></h1>
                <p className="lead">Unserer digitalen Lernplattform. Lernen mit Karteikarten im Web war noch nie so einfach.</p>

                <CardGroup>
                    <Card block>
                        <CardTitle>HSD-Account</CardTitle>
                        <CardText>
                            Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem Hochschul-Account anzumelden.
                        </CardText>

                        <CardText>
                            <a href="http://passport.hs-duesseldorf.de/default.aspx">Passwort vergessen?</a>
                        </CardText>

                        <Button outline color="primary">Anmelden mit HSD-Account</Button>
                    </Card>
                    <Card block>
                        <CardTitle>GoCard-Account</CardTitle>
                        <CardText>
                            Hast du bereits einen GoCard-Account? <br/>
                            <Link to="/registration">GoCard-Account erstellen</Link>
                        </CardText>

                        <Form onSubmit={this.loginGoCard}>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse" />
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Passwort" />
                            </FormGroup>
                            <CardText>
                              <Link to="/reset">Passwort vergessen?</Link>
                            </CardText>

                            <Button outline block color="primary">Anmelden mit GoCard-Account</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}
export default Login;

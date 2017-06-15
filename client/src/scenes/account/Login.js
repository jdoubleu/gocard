import React from "react";
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

class Login extends React.Component{
    render() {
        return (
            <div>
                <div class="HSDLogin">
                  <h2>HSD-Account</h2>
                  <p>Studierende der Hochschule Düsseldorf haben die Möglichkeit, sich mit ihrem
                  Hochschule Account anzumelden.</p>
                  <a href="http://passport.hs-duesseldorf.de/default.aspx">Passwort vergessen?</a>
                  <form>
                    <button type="submit" name="HSDLogin">Anmelden mit HSD-Account</button>
                    <Button color="danger">Anmelden mit HSD-Account</Button>
                  </form>
                </div>

                <div class="GoCardLogin">
                  <h2>GoCard Account</h2>
                  <p>Möchtest du einen GoCard Account erstellen?</p>
                  <Link to="/register">GoCard Account erstellen</Link>
                  <h3>Mit GoCard Account anmelden</h3>
                  <form>
                    <input type="email" name="loginEmail"></input>
                    <input type="password" name="loginPassword"></input>
                  </form>
                </div>
            </div>
        );
    }
}
export default Login;

import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, Form, FormGroup, Input} from "reactstrap";

class Registration extends React.Component {
    constructor(props){
        super(props);
            this.state = {
                password: ''
            }

        this.update = this.update.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateEmail(event){

        let email = event.target.value;
        if(email.includes("@")){
            console.log("@ gefunden ");
        }else {
            //Show error
        }
    }

    update(event){
        this.setState({
            password: event.target.value
        });

    }



    validatePassword(event){

        let confirmPw = event.target.value;
        if(confirmPw === this.state.password){
            console.log("Passwoerter sind gleich");
        }else{
            console.log("Passwoerter sind nicht mehr gleich");
        }


    }

    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Registrierung</h1>
                <p>Willkommen bei GoCard!</p>
                <CardGroup>
                    <Card block>
                        <CardTitle>Registrieren</CardTitle>
                        <CardText>
                            Registriere dich jetzt mit deiner Email Adresse und einem von von dir gewählten Passwort um
                            einen eigenen Account zu erstellen<br/>
                        </CardText>

                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse" onBlur={this.validateEmail}  required/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="password" id="password" placeholder="Passwort" value={this.state.password} onChange={this.update} required/>
                            </FormGroup>
                            <FormGroup>
                                <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="Passwort wiederholen" onChange={this.validatePassword} required/>
                            </FormGroup>
                            <Button outline block color="primary">Erstellen</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}
export default Registration;
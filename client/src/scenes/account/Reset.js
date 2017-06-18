import React from "react";
import {Button, Card, CardGroup, CardText, CardTitle, Form, FormGroup, Input} from "reactstrap";
class Reset extends React.Component {

    validate(event){
        let mail = event.target.value;
        if(mail.includes("@")){
            //mail senden
        }else{

        }
    }
    handleSubmit(event) {
        alert('Your favorite flavor is: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <h1>Passwort zurücksetzten</h1>
                <CardGroup>
                    <Card block>
                        <CardTitle>Zurücksetzen</CardTitle>
                        <CardText>
                            Um dein Passwort zurückzusetzten musst bitte deine Email Adresse angeben<br/>
                        </CardText>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Input type="email" name="email" id="email" placeholder="E-Mail Adresse" onSubmit={this.validate}  required/>
                            </FormGroup>
                            <Button outline block color="primary" >Zurücksetzen</Button>
                        </Form>
                    </Card>
                </CardGroup>
            </div>
        );
    }
}
export default Reset;

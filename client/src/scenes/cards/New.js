import React from "react";
import {
    Button,
    Card,
    CardGroup,
    CardText,
    CardTitle,
    ButtonGroup,
    Col,
    Row,
    Input,
    FormGroup,
    Label,
    InputGroup,
    InputGroupAddon,
    Form

} from "reactstrap";
import {Link} from "react-router-dom";

class New extends React.Component {


    constructor(props) {
        super(props);

        this.count = 1;
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.display = this.display.bind(this);
        this.newInput = this.newInput.bind(this);
        this.state = {
            inputs: [],
            mode: 0,
            answer: 0,
            plus: 0
        };
    }

    onRadioBtnClick(mode) {
        this.setState({mode});


    }

    update(event) {
        this.setState({
            searchInput: event.target.value
        })
    }


    newInput() {
        this.setState({
            inputs: this.state.inputs.concat(
                <InputGroup>
                    <InputGroupAddon>
                        <Input addon type="radio" name="button"/>
                    </InputGroupAddon>
                    <Input type="text" id="answer" name="answer"/>

                </InputGroup>
            )
        })



    }

    display(mode) {
        if (this.state.mode === 1) {
            return (
                <div>
                <FormGroup>
                    <Label for="answer">Antwort</Label>
                    <InputGroup>
                        <InputGroupAddon>
                            <Input addon type="radio" name="button"/>
                        </InputGroupAddon>
                        <Input type="text" id="answer" name="answer"/>

                    </InputGroup>
                    {this.state.inputs.map((form)=> {
                        {form}
                    })}
                    </FormGroup>
                    <FormGroup>
                    <Button outline color="info" onClick={() => this.newInput(1)}
                            active={this.state.plus === 1}>+</Button>

                </FormGroup>
                    </div>
            )
        } else if (this.state.mode === 2) {
            return(
            <FormGroup>
                <Label for="answer">Antwort</Label>
                <InputGroup>
                    <InputGroupAddon>
                        <Input addon type="checkbox" name="button"/>
                    </InputGroupAddon>
                    <Input type="text" id="answer" name="answer"/>

                </InputGroup>
                <Button outline color="info" onClick={() => this.newInput()}
                        active={this.state.plus === 1}>+</Button>

            </FormGroup>
            )
        } else if (this.state.mode === 3) {
            return (
                <FormGroup >
                    <Label for="textanswer">Antwort</Label>

                    <Input type="textarea" name="textanswer" id="textanswer" multiple/>

                </FormGroup>
            )
        } else if (this.state.mode === 4) {
            return (
                <FormGroup >
                    <Label for="textanswer">Antwort</Label>

                    <Input type="textarea" name="textanswer" id="textanswer" multiple/>

                </FormGroup>
            )
        }
    }


    render() {
        return (
            <div>
                <h1>Neue Karteikarte erstellen</h1>
                <CardGroup>
                    <Card block>
                        <CardTitle>Wähle den Fragetyp dieser Karteikarte</CardTitle>

                        <ButtonGroup size="lg">
                            <Button outline color="info" onClick={() => this.onRadioBtnClick(1)}
                                    active={this.state.mode === 1}>Single Choice</Button>
                            <Button outline color="info" onClick={() => this.onRadioBtnClick(2)}
                                    active={this.state.mode === 2}>Multiple Choice</Button>

                            <Button outline color="info" onClick={() => this.onRadioBtnClick(3)}
                                    active={this.state.mode === 3}>Selbstkontrolle</Button>

                            <Button outline color="info" onClick={() => this.onRadioBtnClick(4)}
                                    active={this.state.mode === 4}>Texteingabe</Button>

                        </ButtonGroup>
                        <br/>
                        <Form>
                            <FormGroup>
                                <Label for="question" size="lg">Frage:</Label>
                                <Input type="text" name="question" id="question"
                                       placeholder="Bitte deine Frage eingeben"/>
                            </FormGroup>
                            {this.display()}
                        </Form>
                        <Row>
                            <Col>
                                <Button outline block color="danger">Abbrechen</Button>
                            </Col>
                            <Col>
                                <Button outline block color="primary">Erstellen</Button>
                            </Col>
                        </Row>


                    </Card>
                </CardGroup>
            </div>
        );
    }
}


New.defaultProps = {}

export default New;

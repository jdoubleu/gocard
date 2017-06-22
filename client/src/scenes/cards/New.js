import React from "react";
import {
    Button,
    ButtonGroup,
    Card,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    Label,
    Row
} from "reactstrap";
import TagForm from "../../components/cards/tagForm";
import {Link} from "react-router-dom";
import Header from "../../components/shared/header";

class New extends React.Component {


    constructor(props) {
        super(props);

        this.count = 1;
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);
        this.display = this.display.bind(this);
        this.newInput = this.newInput.bind(this);
        this.newInputMultiple = this.newInputMultiple.bind(this);
        this.state = {
            inputs: [],
            inputsMultiple: [],
            mode: 0,
            answer: 0,
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

    newInputMultiple() {
        this.setState({
            inputsMultiple: this.state.inputsMultiple.concat(
                <InputGroup className="mt-2">
                    <InputGroupAddon>
                        <Input addon type="checkbox" name="button"/>
                    </InputGroupAddon>
                    <Input type="text" id="answer" name="answer"/>

                </InputGroup>
            )
        })
    }

    newInput() {
        this.setState({
            inputs: this.state.inputs.concat(
                <InputGroup className="mt-2">
                    <InputGroupAddon>
                        <Input addon type="radio" name="button"/>
                    </InputGroupAddon>
                    <Input type="text" id="answer" name="answer"/>

                </InputGroup>
            )
        })

    }

    display(mode) {
        //Singlechoice
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
                        {this.state.inputs.map((form) => {
                            return form
                        })}
                    </FormGroup>
                    <FormGroup>
                        <Button block outline color="info" onClick={() => this.newInput(1)}
                        >Weitere Antwort hinzufügen
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
                        <TagForm />
                    </FormGroup>
                </div>
            )
            //Multiplechoice
        } else if (this.state.mode === 2) {
            return (
                <div>
                    <FormGroup>
                        <Label for="answer">Antwort</Label>
                        <InputGroup>
                            <InputGroupAddon>
                                <Input addon type="checkbox" name="button"/>
                            </InputGroupAddon>
                            <Input type="text" id="answer" name="answer"/>
                        </InputGroup>
                        {this.state.inputsMultiple.map((form) => {
                            return form
                        })}
                    </FormGroup>
                    <FormGroup>
                        <Button block outline color="info" onClick={() => this.newInputMultiple()}
                        >Weitere Antwort hinzufügen</Button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
                        <TagForm />
                    </FormGroup>
                </div>
            )
        } else if (this.state.mode === 3) {
            return (
                <div>
                    <FormGroup >
                        <Label for="textanswer">Antwort</Label>
                        <Input type="textarea" name="textanswer" id="textanswer" rows="6"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
                        <TagForm />
                    </FormGroup>
                </div>

            )
        } else if (this.state.mode === 4) {
            return (
                <div>
                    <FormGroup >
                        <Label for="textanswer">Antwort</Label>

                        <Input type="textarea" name="textanswer" id="textanswer" rows="6"/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="tags">Tags</Label>
                        <TagForm />
                    </FormGroup>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <Col sm="12" md={{size: 8, offset: 2}}>
                    <Header
                        title="Neue Karteikarte"
                        lead="Hier kannst du eine neue Karteikarte für Dein Register erstellen."
                    />
                    <Card block>
                        <CardTitle>Wähle den Fragetyp dieser Karteikarte</CardTitle>

                        <ButtonGroup>
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
                                <Label for="question">Frage</Label>
                                <Input type="text" name="question" id="question"
                                       placeholder="Bitte deine Frage eingeben"/>
                            </FormGroup>
                            {this.display()}
                        </Form>
                        <Row>
                            <Col>
                                <Link to="/register/:id">
                                    <Button outline block color="danger">Abbrechen</Button>
                                </Link>
                            </Col>
                            <Col>
                                <Link to="/register/:id">
                                    <Button outline block color="primary">Erstellen</Button>
                                </Link>
                            </Col>
                        </Row>


                    </Card>
                </Col>
            </div>
        );
    }
}


New.defaultProps = {}

export default New;

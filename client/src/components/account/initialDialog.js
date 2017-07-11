import React from "react";
import {
    Button,
    Card,
    CardText,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import PropTypes from "prop-types";

const Dialog = ({handleInputChange, handleSubmit, displayName, modalHandleSubmit, isFetching, modalToggle, modal}) => {
    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Card block>
                <CardTitle>Fast geschafft!</CardTitle>
                <CardText>
                    Bitte gib unten deinen Anzeigenamen ein und akzeptiere die EULA.<br/>
                </CardText>

                <Form>
                    <FormGroup>
                        <Input type="text" name="displayName" id="displayName" placeholder="Anzeigename"
                               onChange={handleInputChange} value={displayName} required/>
                    </FormGroup>

                    <CardText>
                        EULA PLACEHOLDER
                    </CardText>
                    <Row>
                        <Col>
                            <Button outline block color="danger" onClick={modalToggle}>Abbrechen</Button>
                            <Modal isOpen={modal} toggle={modalToggle}>
                                <ModalHeader toggle={modalToggle}>Account löschen</ModalHeader>
                                <ModalBody>
                                    Möchest du wirklich dein Account löschen?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" onClick={modalHandleSubmit} disabled={isFetching}>Account
                                        löschen</Button>{' '}
                                    <Button color="secondary" onClick={modalToggle}>Abbrechen</Button>
                                </ModalFooter>
                            </Modal>
                        </Col>
                        <Col>
                            <Button outline block color="success" onClick={handleSubmit}>Ich akzeptiere die
                                EULA</Button>
                        </Col>
                    </Row>
                </Form>
            </Card>
        </Col>
    )
};

Dialog.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    displayName: PropTypes.string,
    modal: PropTypes.bool.isRequired,
    modalToggle: PropTypes.func.isRequired,
    modalHandleSubmit: PropTypes.func.isRequired,
    isFetching: PropTypes.bool.isRequired
};

export default Dialog;
import React from "react";
import {
    Button,
    Card,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from "reactstrap";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import Headline from "../shared/headline";
import UserIcon from "../shared/user/icon";

const Settings = ({isFetching, handleSubmit, handleInputChange, displayName, email, password, passwordRepeat, modal, modalToggle, modalHandleSubmit}) => {
    return (
        <Col sm="12" md={{size: 8, offset: 2}}>
            <Headline title="Einstellungen"/>

            <Card block>
                <div className="text-center">
                    <UserIcon diameter={200}>
                        {displayName}
                    </UserIcon>
                </div>
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Label for="displayName">Anzeigename</Label>
                        <Input type="text" name="displayName" id="displayName" placeholder="Anzeigename" required
                               value={displayName}
                               onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">E-Mail Adresse</Label>
                        <Input type="email" name="email" id="email" placeholder="E-Mail Adresse" required
                               value={email}
                               onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Passwort</Label>
                        <Input type="password" name="password" id="password"
                               value={password}
                               onChange={handleInputChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="confirmPassword">Passwort wiederholen</Label>
                        <Input type="password" name="confirmPassword" id="confirmPassword"
                               onChange={handleInputChange}
                               value={passwordRepeat}
                        />
                    </FormGroup>
                    <Row>
                        <Col>
                            <Link to="/" className="btn btn-block btn-outline-danger">Abbrechen</Link>
                        </Col>
                        <Col>
                            <Button disabled={isFetching} outline block color="primary">Speichern</Button>
                        </Col>
                    </Row>
                </Form>
                <div>
                    <hr/>
                    <Button color="link" className="text-danger" onClick={modalToggle}>
                        Ich möchte meinen Account permanent löschen.
                    </Button>
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
                </div>
            </Card>
        </Col>
    )
};

Settings.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    passwordRepeat: PropTypes.string,
    modal: PropTypes.bool.isRequired,
    modalToggle: PropTypes.func.isRequired,
    modalHandleSubmit: PropTypes.func.isRequired
};

export default Settings;
import React from "react";
import PropTypes from "prop-types";
import {NavLink, Redirect, Link} from "react-router-dom";
import UserIcon from "../../../modules/shared/user/icon";
import Logo from "../logo";
import {
    Collapse,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavDropdown
} from "reactstrap";
import "./topBar.css";

const TopBar = ({dropDownTopBar, dropDownUser, username, onToggleTopBarDropDown, onToggleUserDropDown, isAuthenticated, onLogout, onNavbarBrandClick}) => {
    return (
        <Container className="top-bar">
            <Navbar light toggleable className="pb-4">
                <NavbarToggler className="border-0" right onClick={onToggleTopBarDropDown}/>
                    <NavbarBrand onClick={() => onNavbarBrandClick()}>
                        <Logo/>
                    </NavbarBrand>
                {
                    isAuthenticated &&
                    <Collapse isOpen={dropDownTopBar} navbar>
                        <Nav className="ml-auto" navbar>
                            <UserIcon name={username}/>
                            <NavDropdown isOpen={dropDownUser} toggle={onToggleUserDropDown}>
                                <DropdownToggle nav caret>
                                    <span>{username}</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <NavLink to="/profile">Einstellungen</NavLink>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem onClick={() => onLogout()}>
                                        <a href="">Logout</a>
                                    </DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                        </Nav>
                    </Collapse>
                }
                {
                    !isAuthenticated &&
                    <Collapse isOpen={dropDownTopBar} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavLink to="/">Anmelden</NavLink>
                        </Nav>
                    </Collapse>
                }
            </Navbar>
        </Container>
    )
};

TopBar.propTypes = {
    dropDownTopBar: PropTypes.bool.isRequired,
    onToggleTopBarDropDown: PropTypes.func.isRequired,
    dropDownUser: PropTypes.bool.isRequired,
    onToggleUserDropDown: PropTypes.func.isRequired,
    username: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onNavbarBrandClick: PropTypes.func.isRequired
};

TopBar.defaultProps = {
    dropDownTopBar: false,
    dropDownUser: false
};

export default TopBar;

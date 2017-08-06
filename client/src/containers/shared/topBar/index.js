import React from "react";
import PropTypes from "prop-types";
import {NavLink, Route} from "react-router-dom";
import Breadcrumb from "../breadcrumb/index";
import UserIcon from "../user/icon";
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

const TopBar = ({dropDownTopBar, dropDownUser, user, onToggleTopBarDropDown, onToggleUserDropDown, isAuthenticated, onLogout, onNavbarBrandClick}) => {
    const handleLogout = (event) => {
        event.preventDefault();
        onLogout();
    };

    return (
        <Container className="top-bar">
            <Navbar light toggleable>
                <NavbarToggler className="border-0" right onClick={onToggleTopBarDropDown}/>
                <NavbarBrand onClick={() => onNavbarBrandClick()}>
                    <Logo/>
                </NavbarBrand>
                {
                    isAuthenticated &&
                    <Collapse isOpen={dropDownTopBar} navbar>
                        <span className="navbar-text mx-auto">
                            <Route component={Breadcrumb}/>
                        </span>
                        {
                            user.status === "active" &&
                            <Nav className="ml-auto" navbar>
                                {
                                    user.displayName &&
                                    <UserIcon>
                                        {user.displayName}
                                    </UserIcon>
                                }

                                <NavDropdown isOpen={dropDownUser} toggle={onToggleUserDropDown}>
                                    <DropdownToggle nav caret>
                                        <span>{user.displayName}</span>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>
                                            <NavLink to="/settings">Einstellungen</NavLink>
                                        </DropdownItem>
                                        <DropdownItem divider/>
                                        <DropdownItem onClick={handleLogout}>
                                            <a href="">Logout</a>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </NavDropdown>
                            </Nav>
                        }
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
    isAuthenticated: PropTypes.bool.isRequired,
    onLogout: PropTypes.func.isRequired,
    onNavbarBrandClick: PropTypes.func.isRequired,
    user: PropTypes.object
};

TopBar.defaultProps = {
    dropDownTopBar: false,
    dropDownUser: false
};

export default TopBar;

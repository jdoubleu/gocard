import React from "react";
import {Link} from "react-router-dom";
import UserIcon from "../user/icon";
import Logo from "../logo/logo";
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
import './topBar.css';

class TopBar extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleProfileDropdown = this.toggleProfileDropdown.bind(this);
        this.state = {
            isOpen: false,
            dropdownOpen: false,
            username: "Frank N. Stein"
        };
    }

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    toggleProfileDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        return (
            <Container className="top-bar">
                <Navbar light toggleable className="pb-4">
                    <NavbarToggler className="border-0" right onClick={this.toggleNavbar}/>
                    <NavbarBrand href="/dashboard">
                        <Logo/>
                    </NavbarBrand>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UserIcon name={this.state.username}/>
                            <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleProfileDropdown}>
                                <DropdownToggle nav caret>
                                    <span>{this.state.username}</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        <Link to="/profile">Einstellungen</Link>
                                    </DropdownItem>
                                    <DropdownItem divider/>
                                    <DropdownItem>
                                        <Link to="/logout">Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </NavDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Container>
        );
    }
}

export default TopBar;

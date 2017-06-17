import React from "react";
import { Link } from 'react-router-dom';
import UserIcon from '../shared/user/icon';
import {
    Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavDropdown
} from "reactstrap";

class Header extends React.Component {
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
    render(){
        return (
          <div class="Header">
              <Navbar color="faded" light toggleable>
                  <NavbarToggler right onClick={this.toggleNavbar} />
                  <NavbarBrand href="/">GoCard</NavbarBrand>
                  <Collapse isOpen={this.state.isOpen} navbar>
                      <Nav className="ml-auto" navbar>
                          <NavDropdown isOpen={this.state.dropdownOpen} toggle={this.toggleProfileDropdown}>
                              <DropdownToggle nav caret>
                                  <UserIcon name={this.state.username} />
                                  <span>{this.state.username}</span>
                              </DropdownToggle>
                              <DropdownMenu right>
                                  <DropdownItem>
                                      <Link to="/profile">Einstellungen</Link>
                                  </DropdownItem>
                                  <DropdownItem divider />
                                  <DropdownItem>
                                      <Link to="/logout">Logout</Link>
                                  </DropdownItem>
                              </DropdownMenu>
                          </NavDropdown>
                      </Nav>
                  </Collapse>
              </Navbar>
          </div>
        );
    }
}

export default Header;

import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    render() {
        return (
            <header>
                <Navbar collapseOnSelect className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" >
                    <Navbar.Brand href="#home">u-ProMIS</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Item>
                                <Nav.Link className="text-dark" href="/">Home</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link className="text-dark" href="/counter">Counter</Nav.Link>
                            </Nav.Item>
                            <NavDropdown title="Contract" id="collapsable-contract-dropdown">
                                <NavDropdown.Item className="text-dark" href='/contract' >
                                    Contracts
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="text-dark" href='/request' >
                                    Requests
                                </NavDropdown.Item>
                                <NavDropdown.Item className="text-dark" href='/proposal' >
                                    Proposals
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Project" id="collapsable-contract-dropdown">
                                <NavDropdown.Item className="text-dark" href='/project' >
                                    Projects
                                </NavDropdown.Item>
                                <NavDropdown.Item className="text-dark" href='/workpackage' >
                                    Workpackages
                                </NavDropdown.Item>
                                <NavDropdown.Item className="text-dark" href='/activity' >
                                    Activities
                                </NavDropdown.Item>
                                <NavDropdown.Item className="text-dark" href='/event' >
                                    Events
                                </NavDropdown.Item>
                                <NavDropdown.Item className="text-dark" href='/mission' >
                                    Missions
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                            </NavDropdown>
                        </Nav>
                  </Navbar.Collapse>
                </Navbar>
            </header>
        );
    }
}

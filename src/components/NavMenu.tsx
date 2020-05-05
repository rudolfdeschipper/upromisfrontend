import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import './NavMenu.css';
import { RouteComponentProps } from 'react-router';
import { Utils } from './Utils';
import { UserManager } from './UserManager';

export class NavMenu extends React.Component<{ User: any }> {
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
                        <Nav className="mr-auto justify-content-center">
                            <Nav.Item>
                                {
                                    !!this.props.User ?
                                        <Nav.Link className="text-dark" onClick={() => {
                                            let mgr = new UserManager();
                                            mgr.Logout();
                                        }} title="Log out" >Logged in as: {this.props.User.profile.name}</Nav.Link>
                                        :
                                        <Nav.Link className="text-dark" onClick={() => { 
                                            let mgr = new UserManager();
                                            mgr.Login();
                                         }} >Log In</Nav.Link>
                                }


                            </Nav.Item>
                            <NavDropdown title="Help" id="collapsable-contract-dropdown">
                                <NavDropdown.Item className="text-dark" href='/help' >
                                    Help
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item className="text-dark" href='/about' >
                                    About
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </header >
        );
    }
}

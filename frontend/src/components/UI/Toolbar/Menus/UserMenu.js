import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">Hello, {user.username}</span>
            </NavItem>
            <NavItem>
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Add new
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={RouterNavLink} to="artists/new">
                            Artist
                        </DropdownItem>
                        <DropdownItem>
                            Album
                        </DropdownItem>
                        <DropdownItem>
                            Track
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;

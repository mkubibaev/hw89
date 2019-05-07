import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">Hello, {user.username}</span>
            </NavItem>
            <NavItem>
                <UncontrolledDropdown>
                    <DropdownToggle nav caret>
                        Add new
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={RouterNavLink} to="/artists/new">
                            Artist
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/album/new">
                            Album
                        </DropdownItem>
                        <DropdownItem tag={RouterNavLink} to="/tracks/new">
                            Track
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </NavItem>
            <NavItem>
                <RouterNavLink className="nav-link" to="/track-history">Track history</RouterNavLink>
            </NavItem>
            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default UserMenu;

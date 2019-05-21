import React from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem className="mr-4">
                <span className="mr-2 text-light">Hello, {user.displayName}</span>
                {user.avatarImage
                    ? <img src={user.avatarImage} alt="" className="avatar-image"/>
                    : null
                }
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
                        <DropdownItem tag={RouterNavLink} to="/albums/new">
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

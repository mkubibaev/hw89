import React from 'react';
import {Nav, NavItem} from "reactstrap";

const AdminMenu = ({user, logout}) => {
    return (
        <Nav>
            <NavItem>
                <span className="nav-link">Hello, {user.username}</span>
            </NavItem>



            <NavItem>
                <span className="nav-link" onClick={logout}>Logout</span>
            </NavItem>
        </Nav>
    );
};

export default AdminMenu;

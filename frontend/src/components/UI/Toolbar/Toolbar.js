import React from 'react';
import {NavLink as RouterNavLink} from 'react-router-dom';
import {Nav, Navbar, NavbarBrand} from "reactstrap";

import UserMenu from "./Menus/UserMenu";
import AnonymousMenu from "./Menus/AnonymousMenu";
import AdminMenu from "./Menus/AdminMenu";

const Toolbar = ({user, logout}) => {
    let menu = <AnonymousMenu/>;

    if (user) {
        if (user.role === 'user') {
            menu =  <UserMenu user={user} logout={logout}/>;
        } else if (user.role === 'admin') {
            menu = <AdminMenu user={user} logout={logout}/>;
        }
    }

    return (
        <Navbar color="info" dark expand="md">
            <NavbarBrand tag={RouterNavLink} to="/">Music</NavbarBrand>
            <Nav className="ml-auto" navbar>
                {menu}
            </Nav>
        </Navbar>
    );
};

export default Toolbar;

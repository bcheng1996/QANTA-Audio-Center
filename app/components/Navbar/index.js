import React from 'react';
import { SideNav, SideNavItem, Button, Icon, Navbar, NavItem } from 'react-materialize';

class MyNavbar extends React.Component {

    render() {
        const brand =
            <div style={{ marginLeft: 10 }}
            >
                QANTA Project
                <Icon>question_answer</Icon>
        </div>
        return (
            <div>
                <Navbar brand={brand} right
                    style={{ backgroundColor: '#0b0C10' }}
                >   
                    <NavItem href='/recordings'><Icon>headset</Icon></NavItem>
                    <NavItem href='/'><Icon>home</Icon></NavItem>
                </Navbar>
            </div>


        );
    }
}

export default MyNavbar;
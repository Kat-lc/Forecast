import React from 'react';
import ReactDOM from 'react-dom';

export class Header extends React.Component {
    render() {
        return (
            <nav class="navbar navbar-custom">
                <span class="navbar-brand mb-0 h1">Weather Report</span>
                <span class="navbar-text white-text">
                    By Katie Cussans and Gino LaGuardia-LoBianco
                </span>
            </nav>
        );
    }
};

export default Header;

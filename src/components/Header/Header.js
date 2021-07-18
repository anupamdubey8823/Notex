import React, { Component } from 'react';
import './Header.css';
import BeenhereIcon from '@material-ui/icons/Beenhere';

export default class Header extends Component {
    render() {
        return(
            <div className='header-container'>
                <div className='heading'>
                    <h1><BeenhereIcon className='AppIcon'/>Notex</h1>
                </div>
            </div>
        );
    }
}
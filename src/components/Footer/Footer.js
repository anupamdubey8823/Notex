import React, { Component } from 'react';
import './Footer.css';

const year = new Date().getFullYear();
export default class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Copyright © {year}</p>
            </footer>
        );
    }
}
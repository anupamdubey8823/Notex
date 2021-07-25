import React from 'react';
import './Footer.css';

const year = new Date().getFullYear();
export default function Footer() {
    return (
        <div className='footer-container'>
            <footer>
                <p>Copyright © {year}</p>
            </footer>
        </div>
);
}